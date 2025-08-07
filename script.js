$(function () {
	$("#toolBar").kendoToolBar({
		iconPosition: "before",
		items: [
			{ type: "spacer" },
			{
				type: "buttonGroup",
				buttons: [
					{
						text: "Incluir", icon: "plus-outline", click: function () {
							if (!$("#winCadastro").data("kendoWindow")) {
								$("#winCadastro").kendoWindow({
									modal: true,
									width: "26%",
									height: "33%",
									visible: false,
									title: "Cadastro"
								})
							}
							$("#winCadastro").data("kendoWindow").center().open()
						}
					},
					{
						text: "Editar", icon: "pencil", click: function () {
							if (!$("#winCadastro").data("kendoWindow")) {
								$("#winCadastro").kendoWindow({
									modal: true,
									width: "26%",
									height: "33%",
									visible: false,
									title: "Edicao"
								})
							}
							$("#winCadastro").data("kendoWindow").center().open()
						}
					}


				]
			}
		]
	});

	$("#grid").kendoGrid({
		height: "60%",
		columns: [
			{ field: "id" },
			{ field: "produto" },
			{ field: "tipo" },
			{ field: "valor" }
		],
		columnMenu: true,
		dataSource: [
			{ id: 3, produto: "Sofa", tipo: "Movel", valor: 700 },
			{ id: 15, produto: "Televisao", tipo: "Eletrodomestico", valor: 2300 },
			{ id: 58, produto: "Martelo", tipo: "Utilitario", valor: 80 }
		],
		sortable: true,
		pageable: {
			refresh: true,
			pageSizes: true,
			buttonCount: 5
		}
	})

	$("#inputNome").kendoTextBox();

	$("#inputCategoria").kendoDropDownList({
		optionLabel: "Selecione uma categoria...",
		dataSource: [
			{ categoria: "Movel" },
			{ categoria: "Eletrodomestico" },
			{ categoria: "Utilitario" }
		],
		dataTextField: "categoria",
		dataValueField: "categoria"
	})

	$("#inputPreco").kendoNumericTextBox({
		min: 0,
		format: "n0"
	});

	$("#inputDataCadastro").kendoDatePicker();

	$("#inputAtivo").kendoSwitch({
		checked: true
	})

	$("#botoesCadastro").kendoToolBar({
		iconPosition: "left",
		items: [
			{
				type: "spacer"
			},
			{
				type: "button", text: "Gravar", icon: "save", click: function () {
					var mensagens = "";
					if ($("#inputNome").data("kendoTextBox").value() == "") {
						mensagens += "<li>O campo <strong>nome</strong> e obrigatorio</li>"
					}

					if ($("#inputCategoria").data("kendoDropDownList").value() == "") {
						mensagens += "<li>Voce deve selecionar uma <strong>categoria</strong></li>"
					}

					if ($("#inputPreco").data("kendoNumericTextBox").value() == "") {
						mensagens += "<li>O <strong>preco</strong> deve ser um valor positivo</li>"
					}

					if (mensagens) {
						$("#mensagensValidacao").html(mensagens)
						$("#validacao").fadeIn("fast")
					}

					$("#botaoValidacao").click(function () {
						$("#validacao").fadeOut("fast")
					})
				}
			},
			{
				type: "button", text: "Excluir", icon: "trash"
			},
			{
				type: "button", text: "Fechar", icon: "cancel"
			}
		]
	})


});