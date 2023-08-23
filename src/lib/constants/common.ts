export const IMAGE_64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAPUlEQVR42u3OMQEAAAgDINc/lck0xh5IQPamKgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLtwAMsUnBBhVaNBQAAAABJRU5ErkJggg==';

export const DATE_FORMAT_OPTIONS: Readonly<Intl.DateTimeFormatOptions> = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};
export const TIME_FORMAT_OPTIONS: Readonly<Intl.DateTimeFormatOptions> = { hour: '2-digit', minute: '2-digit' };
export const RELATIVE_TIME_FORMAT_OPTIONS: Readonly<Intl.RelativeTimeFormatOptions> = { numeric: 'auto' };
export const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat('en', RELATIVE_TIME_FORMAT_OPTIONS);
export const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en', TIME_FORMAT_OPTIONS);
export const DURATION: Readonly<Readonly<{ unit: Intl.RelativeTimeFormatUnit; ms: number }>[]> = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2628000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 }
];

export const EM_DASH_SEPARATOR = ' &mdash; ';

export const AUDIO_OUTPUT = 'audiooutput';
export const AUDIO_SOURCE = 'audioinput';
export const VIDEO_SOURCE = 'videoinput';

export const AUDIO_OUTPUT_PREFIX = 'Speaker';
export const AUDIO_SOURCE_PREFIX = 'Microphone';
export const VIDEO_SOURCE_PREFIX = 'Camera';

export const MUTE_AUDIO = 'Mute Audio';
export const UNMUTE_AUDIO = 'Unmute Audio';

export const MUTE_VIDEO = 'Stop Video';
export const UNMUTE_VIDEO = 'Start Video';

export const MUTE_SHARE = 'Stop Share';
export const UNMUTE_SHARE = 'Start Share';

export const VALID_PHONE =
  /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
export const VALID_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VALID_BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
export const VALID_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
export const VALID_COUNTRY_CODE =
  /^A(BW|FG|GO|IA|L[AB]|ND|R[EGM]|SM|T[AFG]|U[ST]|ZE)|B(DI|E[LNS]|FA|G[DR]|H[RS]|IH|L[MRZ]|MU|OL|R[ABN]|TN|VT|WA)|C(A[FN]|CK|H[ELN]|IV|MR|O[DGKLM]|PV|RI|U[BW]|XR|Y[MP]|ZE)|D(EU|JI|MA|NK|OM|ZA)|E(CU|GY|RI|S[HPT]|TH)|F(IN|JI|LK|R[AO]|SM)|G(AB|BR|EO|GY|HA|I[BN]|LP|MB|N[BQ]|R[CDL]|TM|U[FMY])|H(KG|MD|ND|RV|TI|UN)|I(DN|MN|ND|OT|R[LNQ]|S[LR]|TA)|J(AM|EY|OR|PN)|K(AZ|EN|GZ|HM|IR|NA|OR|WT)|L(AO|B[NRY]|CA|IE|KA|SO|TU|UX|VA)|M(A[CFR]|CO|D[AGV]|EX|HL|KD|L[IT]|MR|N[EGP]|OZ|RT|SR|TQ|US|WI|Y[ST])|N(AM|CL|ER|FK|GA|I[CU]|LD|OR|PL|RU|ZL)|OMN|P(A[KN]|CN|ER|HL|LW|NG|OL|R[IKTY]|SE|YF)|QAT|R(EU|OU|US|WA)|S(AU|DN|EN|G[PS]|HN|JM|L[BEV]|MR|OM|PM|RB|SD|TP|UR|V[KN]|W[EZ]|XM|Y[CR])|T(C[AD]|GO|HA|JK|K[LM]|LS|ON|TO|U[NRV]|WN|ZA)|U(GA|KR|MI|RY|SA|ZB)|V(AT|CT|EN|GB|IR|NM|UT)|W(LF|SM)|YEM|Z(AF|MB|WE)$/;
