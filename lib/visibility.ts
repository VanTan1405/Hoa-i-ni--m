
type RecordRow=Record<string,string>;
export function visibleRows(table:string,records:RecordRow[],user:{id:string;role:string},now=Date.now()){
 return records.filter(r=>r.status!=="deleted")
 .filter(r=>!["LUU_BUT","THU_THOI_GIAN"].includes(table)||r.visibility==="class"||r.owner_id===user.id||r.recipient_id===user.id)
 .filter(r=>table!=="BAO_CAO"||user.role==="admin"||r.owner_id===user.id)
 .map(r=>{const out={...r};delete out._row;if(table==="THU_THOI_GIAN"&&(!Number.isFinite(Date.parse(r.opens_at))||Date.parse(r.opens_at)>now)){out.content="";out.locked="true"}return out});
}
