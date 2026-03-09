export type ContactValidationCode =
  | "CONTACT_NAME_TOO_SHORT"
  | "CONTACT_EMAIL_INVALID"
  | "CONTACT_MESSAGE_TOO_SHORT"
  | "CONTACT_SPAM_BLOCKED";

export type ContactValidationError = {
  code: ContactValidationCode;
  message: string;
  hint: string;
};

type ContactValidationInput = {
  name: string;
  email: string;
  message: string;
  companyWebsite?: string;
};

const MIN_MESSAGE_LENGTH = 8;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const countMatches = (value: string, pattern: RegExp) =>
  (value.match(pattern) ?? []).length;

const looksLikeSpam = (message: string, companyWebsite?: string) => {
  if (companyWebsite?.trim()) {
    return true;
  }

  const normalized = message.trim().toLowerCase();
  const urlCount = countMatches(normalized, /(https?:\/\/|www\.)/g);
  const repeatedChars = /(.)\1{7,}/.test(normalized);
  const telegramOrWhatsappPitch =
    /\b(telegram|whatsapp|seo|casino|crypto)\b/.test(normalized) && urlCount >= 1;

  return urlCount >= 2 || repeatedChars || telegramOrWhatsappPitch;
};

export const validateContactPayload = ({
  name,
  email,
  message,
  companyWebsite,
}: ContactValidationInput): ContactValidationError | null => {
  if (name.length < 2) {
    return {
      code: "CONTACT_NAME_TOO_SHORT",
      message: "Nombre demasiado corto.",
      hint: "Escribe al menos tu nombre o el de tu negocio.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      code: "CONTACT_EMAIL_INVALID",
      message: "Email inválido.",
      hint: "Revisa el correo para poder responderte.",
    };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return {
      code: "CONTACT_MESSAGE_TOO_SHORT",
      message: "Mensaje demasiado corto.",
      hint: "Añade un poco más de contexto. Con 8-10 caracteres ya suele bastar.",
    };
  }

  if (looksLikeSpam(message, companyWebsite)) {
    return {
      code: "CONTACT_SPAM_BLOCKED",
      message: "El mensaje fue bloqueado por la heurística anti-spam.",
      hint: "Evita pegar varios enlaces o texto repetido. Si eres humano, reescríbelo de forma natural.",
    };
  }

  return null;
};
