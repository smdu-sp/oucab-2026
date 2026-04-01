"use client";

import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Style, Fill, Stroke } from "ol/style";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";
import { defaults as defaultControls } from "ol/control";
import KML from "ol/format/KML";
import GeoJSON from "ol/format/GeoJSON";
import { union } from "@turf/union";
import { featureCollection, feature as turfFeature } from "@turf/helpers";
import type { Polygon, MultiPolygon, Feature as GeoJSONFeature } from "geojson";
import { BASE_PATH } from "@/lib/config";

interface MapaVisualizacaoProps {
  className?: string;
  height?: string;
}

const kmlFormat = new KML();
const geoJsonFormat = new GeoJSON();

function kmlToGeoJSONFeatures(kmlText: string) {
  const features = kmlFormat.readFeatures(kmlText, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:4326",
  });
  return geoJsonFormat.writeFeaturesObject(features)
    .features as GeoJSONFeature<Polygon | MultiPolygon>[];
}

function mergeFeatures(
  features: GeoJSONFeature<Polygon | MultiPolygon>[]
): GeoJSONFeature<Polygon | MultiPolygon> | null {
  if (features.length === 0) return null;
  let merged: GeoJSONFeature<Polygon | MultiPolygon> = turfFeature(
    features[0].geometry
  );
  for (let i = 1; i < features.length; i++) {
    const result = union(
      featureCollection([merged, turfFeature(features[i].geometry)])
    );
    if (result) merged = result as GeoJSONFeature<Polygon | MultiPolygon>;
  }
  return merged;
}

async function loadLayer(
  layer: VectorLayer<VectorSource>,
  name: string,
  style: Style,
  merge: boolean
) {
  try {
    const kmlText = await fetch(`${BASE_PATH}/api/shapes/${name}`).then((r) => r.text());
    const features = kmlToGeoJSONFeatures(kmlText);

    if (merge) {
      const merged = mergeFeatures(features);
      if (!merged) return;
      const olFeature = geoJsonFormat.readFeature(merged, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }) as Feature<Geometry>;
      olFeature.setStyle(style);
      layer.getSource()?.addFeature(olFeature);
    } else {
      const olFeatures = geoJsonFormat.readFeatures(
        { type: "FeatureCollection", features },
        { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
      );
      olFeatures.forEach((f) => f.setStyle(style));
      layer.getSource()?.addFeatures(olFeatures);
    }
  } catch (error) {
    console.error(`Erro ao carregar ${name}:`, error);
  }
}

const MapaVisualizacao: React.FC<MapaVisualizacaoProps> = ({
  className = "",
  height = "400px",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const expandidoLayer = new VectorLayer({ source: new VectorSource() });
    const adesaoLayer = new VectorLayer({ source: new VectorSource() });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), expandidoLayer, adesaoLayer],
      view: new View({
        center: fromLonLat([-46.685, -23.525]),
        zoom: 13,
      }),
      controls: defaultControls({ attribution: false, zoom: true, rotate: false }),
    });

    map.getControls().clear();

    // Perímetro expandido — exibido separadamente, sem união
    loadLayer(
      expandidoLayer,
      "perimetro_expandido",
      new Style({
        fill: new Fill({ color: "rgba(59, 130, 246, 0.2)" }),
        stroke: new Stroke({ color: "rgba(59, 130, 246, 0.8)", width: 2 }),
      }),
      false
    );

    // Perímetro de adesão — shapes fundidos em área única (sem linhas internas)
    loadLayer(
      adesaoLayer,
      "perimetro_adesao",
      new Style({
        fill: new Fill({ color: "rgba(128, 71, 155, 0.35)" }),
        stroke: new Stroke({ color: "rgba(128, 71, 155, 0.9)", width: 2 }),
      }),
      true
    );

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative w-full border border-border rounded-lg ${className}`} style={{ height }}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-md shadow px-3 py-2 flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-sm flex-shrink-0" style={{ background: "rgba(128, 71, 155, 0.35)", border: "2px solid rgba(128, 71, 155, 0.9)" }} />
          <span className="text-gray-700 font-medium">Perímetro de Adesão</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-sm flex-shrink-0" style={{ background: "rgba(59, 130, 246, 0.2)", border: "2px solid rgba(59, 130, 246, 0.8)" }} />
          <span className="text-gray-700 font-medium">Perímetro Expandido</span>
        </div>
      </div>
    </div>
  );
};

export default MapaVisualizacao;
