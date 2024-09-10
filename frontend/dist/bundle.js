(()=>{const t="http://localhost:3000";document.getElementById("prettify-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value;try{const n=await fetch(`${t}/prettify`,{method:"POST",headers:{"Content-Type":"application/json"},body:e}),o=await n.json();n.ok?document.getElementById("pretty-json-output").textContent=o.prettifiedJSON:document.getElementById("pretty-json-output").textContent=o.error}catch(t){document.getElementById("pretty-json-output").textContent="Not a valid JSON."}})),document.getElementById("minify-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value;try{const n=await fetch(`${t}/minify`,{method:"POST",headers:{"Content-Type":"application/json"},body:e}),o=await n.json();n.ok?document.getElementById("pretty-json-output").textContent=o.minifiedJSON:document.getElementById("pretty-json-output").textContent=o.error}catch(t){document.getElementById("pretty-json-output").textContent="Not a valid JSON."}})),document.getElementById("validate-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value;try{const n=await fetch(`${t}/validate`,{method:"POST",headers:{"Content-Type":"application/json"},body:e}),o=await n.json();n.ok?document.getElementById("pretty-json-output").textContent=o.message:document.getElementById("pretty-json-output").textContent=o.error}catch(t){document.getElementById("pretty-json-output").textContent="Not a valid JSON."}})),document.getElementById("json-to-csv-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value;try{const n=await fetch(`${t}/json-to-csv`,{method:"POST",headers:{"Content-Type":"application/json"},body:e}),o=await n.json();n.ok?document.getElementById("pretty-json-output").textContent=o.csv:document.getElementById("pretty-json-output").textContent=o.error}catch(t){document.getElementById("pretty-json-output").textContent="Error occurred."}})),document.getElementById("csv-to-json-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value;try{const n=await fetch(`${t}/csv-to-json`,{method:"POST",headers:{"Content-Type":"text/csv"},body:e}),o=await n.json();n.ok?document.getElementById("pretty-json-output").textContent=JSON.stringify(o.json,null,4):document.getElementById("pretty-json-output").textContent=o.error}catch(t){document.getElementById("pretty-json-output").textContent="Error occurred."}})),document.getElementById("xml-to-json-button").addEventListener("click",(async function(){const e=document.getElementById("json-input").value.trim();try{const n=await fetch(`${t}/xml-to-json`,{method:"POST",headers:{"Content-Type":"application/xml"},body:e});if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);const o=await n.json();document.getElementById("pretty-json-output").textContent=JSON.stringify(o.json,null,4)}catch(t){console.error("Error:",t),document.getElementById("pretty-json-output").textContent="Error occurred while converting XML."}}))})();