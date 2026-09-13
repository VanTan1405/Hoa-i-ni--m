
type A14Config={apiBase?:string};
declare global{interface Window{A14_STATIC?:boolean;A14_CONFIG?:A14Config}}
export function staticMode(){return typeof window!=="undefined"&&window.A14_STATIC===true}
export function routeHref(path:string){if(!staticMode())return path;return "#"+(path.startsWith("/")?path:"/"+path)}
export function goTo(path:string,replace=false){const href=routeHref(path);if(replace)window.location.replace(href);else window.location.assign(href)}
export function pageQuery(){return new URLSearchParams(staticMode()?(window.location.hash.split("?")[1]||""):window.location.search)}
export function setViewUrl(view:string){window.history.replaceState(null,"",routeHref("/lop?view="+view))}
export function assetUrl(path:string){return staticMode()?"./"+path.replace(/^\//,""):path}
export function apiUrl(path:string){const base=typeof window!=="undefined"?(window.A14_CONFIG?.apiBase||"").replace(/\/$/,""):"";return base+"/api/"+path.replace(/^\/?api\//,"")}
export async function apiFetch(path:string,options:RequestInit={}){if(staticMode()&&!window.A14_CONFIG?.apiBase)throw new Error("Bản GitHub Pages chưa được kết nối máy chủ. Hãy cấu hình apiBase trong a14-config.js để bật đăng nhập và lưu Google Drive.");return fetch(apiUrl(path),{...options,credentials:"include"})}
