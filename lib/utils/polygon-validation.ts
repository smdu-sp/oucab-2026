const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export type AreaPerimetro = "ADESAO" | "EXPANDIDO";

export interface PerimeterResult {
  isValid: boolean;
  area: AreaPerimetro | null;
}

/**
 * Valida se coordenadas estão dentro dos perímetros OUCAB e retorna qual área.
 */
export async function checkOUCABPerimeter(
  latitude: number,
  longitude: number
): Promise<PerimeterResult> {
  try {
    const response = await fetch(
      `${BASE_PATH}/api/validacao/perimetro?lat=${latitude}&lng=${longitude}`
    );
    if (!response.ok) return { isValid: false, area: null };
    const data = await response.json();
    return { isValid: data.valid === true, area: data.area ?? null };
  } catch {
    return { isValid: false, area: null };
  }
}

/**
 * Retorna apenas se está dentro do perímetro (compatibilidade).
 */
export async function isWithinOUCABPerimeter(
  latitude: number,
  longitude: number
): Promise<boolean> {
  const { isValid } = await checkOUCABPerimeter(latitude, longitude);
  return isValid;
}

/**
 * Valida endereço contra os perímetros OUCAB, retornando área e mensagem.
 */
export async function validateAddressInPerimeter(endereco: {
  latitude: number | null;
  longitude: number | null;
}): Promise<{ isValid: boolean; area: AreaPerimetro | null; message: string }> {
  if (!endereco.latitude || !endereco.longitude) {
    return {
      isValid: false,
      area: null,
      message:
        "Coordenadas do endereço não encontradas. Verifique se o endereço está correto.",
    };
  }

  const { isValid, area } = await checkOUCABPerimeter(
    endereco.latitude,
    endereco.longitude
  );

  if (!isValid) {
    return {
      isValid: false,
      area: null,
      message:
        "O endereço informado não está dentro das áreas de abrangência da OUCAB. Verifique se o endereço está correto ou escolha um endereço dentro da região permitida.",
    };
  }

  return {
    isValid: true,
    area,
    message: "Endereço válido dentro da área de abrangência da OUCAB.",
  };
}
