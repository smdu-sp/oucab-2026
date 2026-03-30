"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { defaults as defaultControls } from "ol/control";
import KML from "ol/format/KML";
import { Loader2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkOUCABPerimeter } from "@/lib/utils/polygon-validation";

interface MapaEnderecoOpenLayersProps {
  className?: string;
}

const MapaEnderecoOpenLayers: React.FC<MapaEnderecoOpenLayersProps> = ({
  className = "",
}) => {
  const { setValue, watch } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const kmlAdesaoLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const kmlExpandidoLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [isLoadingReverseGeo, setIsLoadingReverseGeo] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(13);
  const [isWithinPerimeter, setIsWithinPerimeter] = useState<boolean | null>(null);

  const latitude = watch("endereco.latitude");
  const longitude = watch("endereco.longitude");
  const tipoInscricao = watch("tipoInscricao") as string;
  const apenasAdesao = tipoInscricao === "REP_MOVIMENTOS_MORADIA";

  // Ref para uso dentro do closure do map click handler
  const apenasAdesaoRef = useRef(apenasAdesao);
  useEffect(() => { apenasAdesaoRef.current = apenasAdesao; }, [apenasAdesao]);

  const validateCoordinates = async (lat: number, lon: number): Promise<boolean> => {
    const { isValid, area } = await checkOUCABPerimeter(lat, lon);

    const bloqueado = isValid && area === "EXPANDIDO" && apenasAdesaoRef.current;
    const aceito = isValid && !bloqueado;

    setIsWithinPerimeter(aceito);

    if (!aceito) {
      setValue("endereco.areaPerimetro", null);
      if (bloqueado) {
        toast.error(
          "Representantes de movimentos de moradia só podem selecionar endereços dentro do perímetro de adesão."
        );
      } else {
        toast.error(
          "Este endereço está fora das áreas de abrangência da OUCAB. Por favor, selecione um endereço dentro da área permitida."
        );
      }
      setValue("endereco.logradouro", "");
      setValue("endereco.numero", "");
      setValue("endereco.bairro", "");
      setValue("endereco.cidade", "");
      setValue("endereco.estado", "");
      setValue("endereco.cep", "");
      setValue("endereco.complemento", "");
    } else {
      setValue("endereco.areaPerimetro", area);
      toast.success("Endereço dentro da área de abrangência da OUCAB!");
    }

    return aceito;
  };

  const getEstadoSigla = (nomeEstado: string): string => {
    const estados: { [key: string]: string } = {
      'acre': 'AC', 'alagoas': 'AL', 'amapá': 'AP', 'amapa': 'AP',
      'amazonas': 'AM', 'bahia': 'BA', 'ceará': 'CE', 'ceara': 'CE',
      'distrito federal': 'DF', 'espírito santo': 'ES', 'espirito santo': 'ES',
      'goiás': 'GO', 'goias': 'GO', 'maranhão': 'MA', 'maranhao': 'MA',
      'mato grosso': 'MT', 'mato grosso do sul': 'MS', 'minas gerais': 'MG',
      'pará': 'PA', 'para': 'PA', 'paraíba': 'PB', 'paraiba': 'PB',
      'paraná': 'PR', 'parana': 'PR', 'pernambuco': 'PE', 'piauí': 'PI',
      'piaui': 'PI', 'rio de janeiro': 'RJ', 'rio grande do norte': 'RN',
      'rio grande do sul': 'RS', 'rondônia': 'RO', 'rondonia': 'RO',
      'roraima': 'RR', 'santa catarina': 'SC', 'são paulo': 'SP',
      'sao paulo': 'SP', 'sergipe': 'SE', 'tocantins': 'TO',
    };
    const nomeNormalizado = nomeEstado.toLowerCase().trim();
    return estados[nomeNormalizado] || nomeEstado.toUpperCase().substring(0, 2);
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    setIsLoadingReverseGeo(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.address) {
        const address = data.address;
        setValue("endereco.logradouro", address.road || address.pedestrian || "");
        setValue("endereco.numero", address.house_number || "");
        setValue("endereco.bairro", address.neighbourhood || address.suburb || "");
        setValue("endereco.cidade", address.city || address.town || address.village || "");
        setValue("endereco.estado", getEstadoSigla(address.state || ""));
        setValue("endereco.cep", address.postcode || "");
        setValue("endereco.complemento", "");
        toast.success("Endereço encontrado e preenchido automaticamente!");
      } else {
        toast.error("Não foi possível encontrar o endereço para esta localização.");
      }
    } catch (error) {
      console.error("Erro na geocodificação reversa:", error);
      toast.error("Erro ao buscar endereço. Tente novamente.");
    } finally {
      setIsLoadingReverseGeo(false);
    }
  };

  const addMarker = (lat: number, lon: number) => {
    if (!markerLayerRef.current) return;
    const coordinates = fromLonLat([lon, lat]);
    const marker = new Feature({ geometry: new Point(coordinates) });
    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: "#ef4444" }),
          stroke: new Stroke({ color: "#ffffff", width: 2 }),
        }),
      })
    );
    const source = markerLayerRef.current.getSource();
    if (source) {
      source.clear();
      source.addFeature(marker);
    }
  };

  const loadKMZLayer = async (
    layerRef: React.MutableRefObject<VectorLayer<VectorSource> | null>,
    shapeName: string,
    fillColor: string,
    strokeColor: string
  ) => {
    if (!layerRef.current) return;
    try {
      const response = await fetch(`/api/shapes/${shapeName}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const kmlText = await response.text();

      const format = new KML();
      const features = format.readFeatures(kmlText, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      features.forEach((feature) => {
        feature.setStyle(
          new Style({
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({ color: strokeColor, width: 2 }),
          })
        );
      });

      const source = layerRef.current.getSource();
      if (source) {
        source.clear();
        source.addFeatures(features);
      }
    } catch (error) {
      console.error(`Erro ao carregar ${shapeName}:`, error);
      toast.error("Erro ao carregar dados do mapa.");
    }
  };

  const zoomIn = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.animate({ zoom: Math.min((view.getZoom() || 13) + 1, 19), duration: 250 });
    }
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.animate({ zoom: Math.max((view.getZoom() || 13) - 1, 1), duration: 250 });
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    markerLayerRef.current = new VectorLayer({ source: new VectorSource() });
    kmlAdesaoLayerRef.current = new VectorLayer({ source: new VectorSource() });
    kmlExpandidoLayerRef.current = new VectorLayer({ source: new VectorSource() });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        kmlExpandidoLayerRef.current,
        kmlAdesaoLayerRef.current,
        markerLayerRef.current,
      ],
      view: new View({
        center: fromLonLat([-46.685, -23.525]),
        zoom: 13,
      }),
      controls: defaultControls({ zoom: false, rotate: false, attribution: true }),
    });

    mapInstanceRef.current = map;

    map.getView().on("change:resolution", () => {
      const zoom = map.getView().getZoom();
      if (zoom !== undefined) setCurrentZoom(Math.round(zoom));
    });

    loadKMZLayer(
      kmlAdesaoLayerRef,
      "perimetro_adesao",
      "rgba(128, 71, 155, 0.35)",
      "rgba(128, 71, 155, 0.9)"
    );
    loadKMZLayer(
      kmlExpandidoLayerRef,
      "perimetro_expandido",
      "rgba(59, 130, 246, 0.2)",
      "rgba(59, 130, 246, 0.8)"
    );

    map.on("click", async (event) => {
      const [lon, lat] = toLonLat(event.coordinate);

      setValue("endereco.latitude", lat);
      setValue("endereco.longitude", lon);
      addMarker(lat, lon);

      const isValid = await validateCoordinates(lat, lon);
      if (isValid) {
        reverseGeocode(lat, lon);
      }
    });

    return () => {
      if (mapInstanceRef.current) mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current = null;
      markerLayerRef.current = null;
      kmlAdesaoLayerRef.current = null;
      kmlExpandidoLayerRef.current = null;
    };
  }, [setValue]);

  useEffect(() => {
    if (latitude && longitude && typeof latitude === "number" && typeof longitude === "number") {
      addMarker(latitude, longitude);
      checkOUCABPerimeter(latitude, longitude).then(({ isValid, area }) => {
        const aceito = isValid && !(area === "EXPANDIDO" && apenasAdesao);
        setIsWithinPerimeter(aceito);
      });
    }
  }, [latitude, longitude]);

  // Mostrar/ocultar perímetro expandido conforme tipo de inscrição
  useEffect(() => {
    if (kmlExpandidoLayerRef.current) {
      kmlExpandidoLayerRef.current.setVisible(!apenasAdesao);
    }
  }, [apenasAdesao]);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {isLoadingReverseGeo && (
          <div className="absolute top-2 right-2 z-10 bg-white rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando endereço...
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 bg-white hover:bg-gray-50 shadow-lg"
            onClick={zoomIn}
            disabled={currentZoom >= 19}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 bg-white hover:bg-gray-50 shadow-lg"
            onClick={zoomOut}
            disabled={currentZoom <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        <div
          ref={mapRef}
          className="h-96 w-full rounded-lg border overflow-hidden"
          style={{ minHeight: "384px" }}
        />

        {/* Coordenadas e Status */}
        {latitude && longitude && (
          <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-2 shadow-lg z-10">
            <p className="text-xs text-gray-600">
              Lat: {latitude.toFixed(6)}
              <br />
              Lng: {longitude.toFixed(6)}
            </p>
            {isWithinPerimeter !== null && (
              <div
                className={`mt-1 text-xs font-medium ${
                  isWithinPerimeter ? "text-green-600" : "text-red-600"
                }`}
              >
                {isWithinPerimeter ? "✓ Dentro do perímetro" : "✗ Fora do perímetro"}
              </div>
            )}
          </div>
        )}

        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-2 shadow-lg z-10 text-xs">
          <p className="font-semibold mb-1 text-gray-700">Legenda</p>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-3 h-3 rounded-sm border-2 border-purple-600 bg-purple-400/40 flex-shrink-0" />
            <span className="text-gray-600">Perímetro de Adesão</span>
          </div>
          {!apenasAdesao && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-blue-300/40 flex-shrink-0" />
              <span className="text-gray-600">Perímetro Expandido</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapaEnderecoOpenLayers;
