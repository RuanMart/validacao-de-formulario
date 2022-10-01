// CPF 1 - 901.004.990-66 / CPF 2 - 852.201.760-30
class ValidaCpf {
	constructor(cpfEnviado) {
		Object.defineProperty(this, "cpfLimpo", {
			enumerable: true,

			get: function () {
				return cpfEnviado.replace(/\D+/g, "");
			},
		});
	}

	valida() {
		const cpfParcial = this.cpfLimpo.slice(0, -2);

		const digito1 = this.criaDigito(cpfParcial);

		const digito2 = this.criaDigito(cpfParcial + digito1);

		const novoCpf = cpfParcial + digito1 + digito2;

		if (typeof this.cpfLimpo === "undefined") return false;

		if (this.cpfLimpo.length !== 11) return false;

		if (this.sequencia() === true) return false;

		return novoCpf === this.cpfLimpo;
	}

	criaDigito(cpfParcial) {
		const cpfArray = Array.from(cpfParcial);

		let regressivo = cpfArray.length + 1;

		const total = cpfArray.reduce((ac, val) => {
			ac += regressivo * Number(val);

			regressivo--;

			return ac;
		}, 0);

		let digito = 11 - (total % 11);

		return digito > 9 ? "0" : String(digito);
	}

	sequencia() {
		return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
	}
}

//const cpf = new ValidaCpf("852.201.760-30");

//const verificacao = cpf.valida() ? "CPF válido" : "CPF inválido";

//console.log(verificacao);
