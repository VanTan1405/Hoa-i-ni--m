
import assert from "node:assert/strict";
import {visibleRows} from "../lib/visibility.ts";
const now=Date.parse("2026-01-01T00:00:00Z");
const member={id:"u1",role:"member"};
const records=[{id:"private-other",owner_id:"u2",recipient_id:"u3",visibility:"private",content:"secret",status:"active"},{id:"mine",owner_id:"u2",recipient_id:"u1",visibility:"private",content:"mine",status:"active"},{id:"class",owner_id:"u2",recipient_id:"u3",visibility:"class",content:"shared",status:"active"},{id:"deleted",owner_id:"u1",recipient_id:"u1",visibility:"class",content:"gone",status:"deleted"}];
assert.deepEqual(visibleRows("LUU_BUT",records,member).map(r=>r.id),["mine","class"]);
assert.deepEqual(visibleRows("LUU_BUT",records,{id:"admin",role:"admin"}).map(r=>r.id),["class"]);
const letter={id:"future",owner_id:"u1",recipient_id:"u2",visibility:"private",content:"future secret",status:"active",opens_at:"2027-01-01T00:00:00Z",_row:"2"};
assert.equal(visibleRows("THU_THOI_GIAN",[letter],member,now)[0].content,"");
assert.equal(visibleRows("THU_THOI_GIAN",[letter],member,Date.parse("2027-01-01T00:00:00Z"))[0].content,"future secret");
assert.equal(visibleRows("THU_THOI_GIAN",[{...letter,opens_at:"invalid"}],member,now)[0].locked,"true");
assert.equal(visibleRows("THU_THOI_GIAN",[letter],member,now)[0]._row,undefined);
assert.equal(letter.content,"future secret");
console.log("PASS: private letters, class letters, admin privacy, deleted records, timed opening, malformed dates, internal fields and source immutability.");
const origin=process.env.A14_TEST_ORIGIN||"http://localhost:5173";
if(!["localhost","127.0.0.1"].includes(new URL(origin).hostname))throw new Error("Smoke tests only run against a local preview.");
const password=process.argv[2];
if(!password){console.log("HTTP authentication checks skipped: pass the local admin password.");process.exit(0)}
async function call(path,body,headers={}){return fetch(origin+"/api/"+path,{method:body?"POST":"GET",headers:{"Content-Type":"application/json",Origin:origin,...headers},body:body?JSON.stringify(body):undefined})}
assert.equal((await call("admin/users")).status,401);
assert.equal((await call("data/HO_SO")).status,401);
assert.equal((await call("auth/login",{username:"TANNV",password:"wrong-password"})).status,401);
assert.equal((await call("auth/login",{username:"TANNV",password},{Origin:"https://untrusted.example"})).status,403);
const login=await call("auth/login",{username:"TANNV",password});assert.equal(login.status,200);const cookie=login.headers.get("set-cookie");assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Lax/);const session=cookie.split(";")[0];
const me=await call("me",null,{Cookie:session});assert.equal((await me.json()).user.role,"admin");
assert.equal((await call("admin/users",null,{Cookie:session})).status,200);
assert.equal((await call("admin/users",null,{Cookie:session+"tampered"})).status,401);
const unconnected=await call("data/BAI_VIET",null,{Cookie:session});assert.equal(unconnected.status,503);
const name="QA_LOCAL_"+Date.now();const memberPass="OnlyForLocalTesting_123";
const signup=await call("auth/register",{username:name,name:"QA Local Test",email:"",password:memberPass});assert.equal(signup.status,201);
assert.equal((await call("auth/login",{username:name,password:memberPass})).status,403);
assert.equal((await call("auth/register",{username:"x",name:"X",password:"short"})).status,400);
console.log("PASS: login, invalid credentials, cookie flags, tampered session, anonymous access, CSRF rejection, disconnected storage and pending member denial.");
console.log("Local test account:",name);
