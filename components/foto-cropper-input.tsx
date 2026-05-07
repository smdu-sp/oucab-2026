"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Check, Trash2, RefreshCw } from "lucide-react";

const ASPECT = 3 / 4; // proporção 3×4 (largura/altura)
const CANVAS_MAX_W = 580;
const CANVAS_MAX_H = 430;
const HANDLE_SIZE = 14;
const OUTPUT_W = 480;
const OUTPUT_H = 640;

interface Rect { x: number; y: number; w: number; h: number; }

interface FotoCropperInputProps {
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FotoCropperInput({ value, onChange, error }: FotoCropperInputProps) {
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [crop, setCrop] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropRef = useRef<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const dragRef = useRef<null | { mode: "move" | "resize"; ox: number; oy: number; startRect: Rect }>(null);

  // URL de preview para o estado "done"
  useEffect(() => {
    if (value instanceof File && !editingFile) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [value, editingFile]);

  // Carrega a imagem no canvas quando o arquivo de edição muda
  useEffect(() => {
    if (!editingFile) {
      imgRef.current = null;
      setCanvasSize({ w: 0, h: 0 });
      return;
    }

    const url = URL.createObjectURL(editingFile);
    const img = new Image();

    img.onload = () => {
      imgRef.current = img;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      let cw = CANVAS_MAX_W;
      let ch = Math.round(cw / imgAspect);
      if (ch > CANVAS_MAX_H) {
        ch = CANVAS_MAX_H;
        cw = Math.round(ch * imgAspect);
      }

      setCanvasSize({ w: cw, h: ch });

      const cropH = Math.round(ch * 0.72);
      const cropW = Math.round(cropH * ASPECT);
      const initialCrop: Rect = {
        x: Math.round((cw - cropW) / 2),
        y: Math.round((ch - cropH) / 2),
        w: cropW,
        h: cropH,
      };
      cropRef.current = initialCrop;
      setCrop(initialCrop);
    };

    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [editingFile]);

  // Renderiza o canvas
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || canvasSize.w === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w: cw, h: ch } = canvasSize;
    const { x, y, w, h } = cropRef.current;

    ctx.drawImage(img, 0, 0, cw, ch);

    // Overlay escuro fora do recorte
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, cw, ch);

    // Revela a imagem dentro do recorte
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(img, 0, 0, cw, ch);
    ctx.restore();

    // Borda do recorte
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // Grade de terços
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(x + w * i / 3, y); ctx.lineTo(x + w * i / 3, y + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + h * i / 3); ctx.lineTo(x + w, y + h * i / 3); ctx.stroke();
    }

    // Cantos em L
    const m = 14;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    const corners = [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]] as const;
    for (const [cx, cy, dx, dy] of corners) {
      ctx.beginPath(); ctx.moveTo(cx, cy + dy * m); ctx.lineTo(cx, cy); ctx.lineTo(cx + dx * m, cy); ctx.stroke();
    }

    // Alça de redimensionamento (canto inferior direito)
    const hs = HANDLE_SIZE;
    ctx.fillStyle = "white";
    ctx.fillRect(x + w - hs / 2, y + h - hs / 2, hs, hs);
  }, [canvasSize]);

  useEffect(() => { render(); }, [render, crop]);

  const getCanvasXY = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      mx: (e.clientX - rect.left) * (canvasSize.w / rect.width),
      my: (e.clientY - rect.top) * (canvasSize.h / rect.height),
    };
  };

  const hitTest = (mx: number, my: number) => {
    const { x, y, w, h } = cropRef.current;
    const ht = HANDLE_SIZE + 6;
    if (Math.abs(mx - (x + w)) < ht && Math.abs(my - (y + h)) < ht) return "resize";
    if (mx >= x && mx <= x + w && my >= y && my <= y + h) return "move";
    return null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { mx, my } = getCanvasXY(e);
    const mode = hitTest(mx, my);
    if (!mode) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { mode, ox: mx, oy: my, startRect: { ...cropRef.current } };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { mx, my } = getCanvasXY(e);
    const ds = dragRef.current;

    if (!ds) {
      const hit = hitTest(mx, my);
      e.currentTarget.style.cursor = hit === "resize" ? "se-resize" : hit === "move" ? "move" : "default";
      return;
    }

    const dx = mx - ds.ox;
    const dy = my - ds.oy;
    const sc = ds.startRect;
    const { w: cw, h: ch } = canvasSize;

    let newCrop: Rect;
    if (ds.mode === "move") {
      newCrop = {
        x: Math.max(0, Math.min(cw - sc.w, sc.x + dx)),
        y: Math.max(0, Math.min(ch - sc.h, sc.y + dy)),
        w: sc.w,
        h: sc.h,
      };
    } else {
      const newW = Math.max(60, Math.min(cw - sc.x, sc.w + dx));
      const newH = Math.round(newW / ASPECT);
      if (sc.y + newH > ch) return;
      newCrop = { x: sc.x, y: sc.y, w: newW, h: newH };
    }

    cropRef.current = newCrop;
    setCrop(newCrop);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const applyCrop = () => {
    const img = imgRef.current;
    if (!img || canvasSize.w === 0) return;

    const out = document.createElement("canvas");
    out.width = OUTPUT_W;
    out.height = OUTPUT_H;
    const ctx = out.getContext("2d");
    if (!ctx) return;

    const { x, y, w, h } = cropRef.current;
    const sx = (x / canvasSize.w) * img.naturalWidth;
    const sy = (y / canvasSize.h) * img.naturalHeight;
    const sw = (w / canvasSize.w) * img.naturalWidth;
    const sh = (h / canvasSize.h) * img.naturalHeight;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUTPUT_W, OUTPUT_H);
    out.toBlob((blob) => {
      if (!blob) return;
      onChange(new File([blob], "foto-3x4.jpg", { type: "image/jpeg" }));
      setEditingFile(null);
    }, "image/jpeg", 0.93);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(null);
      setEditingFile(file);
    }
    e.target.value = "";
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      onChange(null);
      setEditingFile(file);
    }
  };

  // Estado: aguardando arquivo
  if (!editingFile && !value) {
    return (
      <div className="space-y-2">
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-muted/30 transition-colors"
          onClick={openFilePicker}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">Clique ou arraste a foto aqui</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou WebP — você poderá recortar na proporção 3×4 em seguida</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileSelect} />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  // Estado: editando (canvas de recorte)
  if (editingFile) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Arraste o recorte para reposicioná-lo. Use a alça branca no canto inferior direito para redimensionar. A proporção 3×4 é mantida automaticamente.
        </p>

        {canvasSize.w > 0 ? (
          <div className="rounded-lg overflow-hidden border bg-black flex justify-center">
            <canvas
              ref={canvasRef}
              width={canvasSize.w}
              height={canvasSize.h}
              className="max-w-full touch-none select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </div>
        ) : (
          <div className="h-48 rounded-lg border flex items-center justify-center text-sm text-muted-foreground">
            Carregando imagem…
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={applyCrop}
            disabled={canvasSize.w === 0}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            <Check className="h-4 w-4 mr-1" />
            Confirmar Recorte
          </Button>
          <Button type="button" variant="outline" onClick={() => setEditingFile(null)}>
            Cancelar
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  // Estado: foto recortada com sucesso
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4 p-3 rounded-lg border bg-muted/20">
        {previewUrl && (
          <div className="shrink-0">
            <img
              src={previewUrl}
              alt="Foto 3×4 recortada"
              className="w-14 rounded border shadow-sm"
              style={{ aspectRatio: "3/4", objectFit: "cover" }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-emerald-600 flex items-center gap-1.5">
            <Check className="h-4 w-4" />
            Foto recortada com sucesso
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Proporção 3×4 aplicada</p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button type="button" variant="outline" size="sm" onClick={openFilePicker} title="Trocar foto">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => onChange(null)} title="Remover">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileSelect} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
