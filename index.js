
//Funcao mascara para TextFields
/*
param 'v' => React.Ref() ou element,
param 'r' => Tipo de mascara ('moeda','cpf','cpfcnpj','telefone','celular')
*/
module.exports = function mask (v, r) {
  if (r === "moeda") {
    v.value = v.value.replace(/[^\d+]/g, "");
    let t = v.value;
    if (Number(t) < 10 || t == "")
      v.value = v.value.replace(/.*(\d+)/g, "0,0$1");
    else if (Number(t) < 100) v.value = v.value.replace(/.*(\d{2})/g, "0,$1");
    else if (t.length < 6)
      v.value = v.value.replace(/^0+/g, "").replace(/(\d+)(\d{2})/g, "$1,$2");
    else if (t.length < 9)
      v.value = v.value
        .replace(/^0+/g, "")
        .replace(/(\d+)(\d{3})(\d{2})/g, "$1.$2,$3");
    else if (t.length < 12)
      v.value = v.value
        .replace(/^0+/g, "")
        .replace(/(\d+)(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3,$4");
    else
      v.value = v.value
        .replace(/^0+/g, "")
        .replace(/(\d+)(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3.$4,$5");

    v.value = "R$ " + v.value;
  }

  if (r === "cpf") {
    v.value = v.value.replace(/[^\d+]/g, "");
    v.value = v.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/g, "$1.$2.$3-$4");
  }

  if (r === "cpfcnpj") {
    if (v.value.length < 13) {
      v.value = v.value.replace(/[^\d+]/g, "");
      v.value = v.value.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2}).*/g,
        "$1.$2.$3-$4"
      );
    } else {
      v.value = v.value.replace(/[^\d+]/g, "");
      v.value = v.value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/g,
        "$1.$2.$3/$4-$5"
      );
    }
  }

  if (r === "telefone" || r === "celular") {
    v.value = v.value.replace(/[^\d+]/g, "");
    v.value = v.value.replace(/(\d{2})(\d{4,5})(\d{4}).*/g, "($1) $2-$3");
  }

  if (r === "cep") {
    v.value = v.value.replace(/[^\d+]/g, "");
    v.value = v.value.replace(/(\d{5})(\d{3}).*/g, "$1-$2");
  }
};
