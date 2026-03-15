import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import next from "next";
 
const privateRoute = ["/dashboard","/Cart","/CheckOutFrom"]
export async function proxy(req) {
  const token = await getToken({req});
  const isAuthenticated = Boolean(token);
  const reqPath=req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some(route=> 
    req.nextUrl.pathname.startsWith(route));
  

  if(!isAuthenticated && isPrivateReq){
       return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${reqPath}`, req.url))
  }
  console.log(token,isPrivateReq,reqPath,isAuthenticated);

  return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ["/dashboard/:path*","/Cart/:path*","/CheckOutFrom/:path*"]
}