import { browser, element, by } from "protractor";

describe("Prueba 1: Navegacion correcta", ()=> {
    //Codigo de configuracion
    beforeEach(() => {
        browser.get("/");
    });
});
//Prueba 1
it("El titulo 1 contiene SGV Primera Copmania",()=>{
    expect(element(by.id("titulo1")).getText()).toContain("SGV Primera Compañía")
});

//Prueba 2
it("Boton con nombre", ()=>{
    expect(element(by.id("botonprueba")).getText()).toContain("INGRESAR")
});