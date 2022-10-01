class Formulario {
	constructor() {
		this.form = document.querySelector(".formulario");

		this.event();
	}

	event() {
		this.form.addEventListener("submit", (e) => {
			this.handleSubmit(e);
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const validFields = this.checkFields();

		const validPasswords = this.passwordIsValid();

		if (validPasswords && validFields) {
			alert("formulário enviado");

			this.form.submit();
		}
	}

	checkFields() {
		let valid = true;

		for (let errorText of this.form.querySelectorAll(".error-text")) {
			errorText.remove();
		}

		for (let field of this.form.querySelectorAll(".valid")) {
			const label = field.previousElementSibling.innerText;

			if (!field.value) {
				this.createError(field, `${label} não pode estar vazio`);
			}

			if (field.classList.contains("cpf")) {
				if (!this.validaCpf(field)) valid = false;
			}

			if (field.classList.contains("usuario")) {
				if (!this.validaUsuario(field)) valid = false;
			}
		}

		return valid;
	}

	passwordIsValid() {
		let valid = true;

		const password = this.form.querySelector(".senha");

		const repeatPassword = this.form.querySelector(".repetir-senha");

		if (password.value !== repeatPassword.value) {
			valid = false;

			this.createError(password, "As senhas não coincidem");

			this.createError(repeatPassword, "As senhas não coincidem");
		}

		if (password.value.length < 6 || password.value.length > 12) {
			valid = false;

			this.createError(password, "A senha precisa ter entre 6 e 12 caracteres");
		}

		return valid;
	}

	validaUsuario(field) {
		const usuario = field.value;
		let valid = true;

		if (usuario.length < 3 || usuario.length > 12) {
			this.createError(field, "Usuário precisa ter entre 3 e 12 caracteres");
			valid = false;
		}

		if (!usuario.match(/^[a-zA-Z0-9]+/g)) {
			this.createError(
				field,
				"Nome de usuário precisa conter apenas letras e/ou números"
			);
		}

		return valid;
	}

	validaCpf(field) {
		const cpf = new ValidaCpf(field.value);

		if (!cpf.valida()) {
			this.createError(field, "CPF inválido");
			return false;
		}

		return true;
	}

	createError(field, message) {
		const div = document.createElement("div");

		div.innerHTML = message;

		div.classList.add("error-text");

		field.insertAdjacentElement("afterend", div);
	}
}

const form = new Formulario();
