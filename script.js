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
						text: "Editar", id: "btnEditar", icon: "pencil", enable: false, click: function () {
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
			{ field: "nome", title: "Nome", type: "string" },
			{ field: "categoria", title: "Categoria", type: "string" },
			{ field: "valor", title: "Valor", type: "number", format: "{0:c2}" },
			{ field: "dataCadastro", title: "Data de Cadastro", type: "date", format: "{0:d}" },
			{
				field: "ativo", title: "Ativo:", template: function (produto) {

					if (produto.ativo == "true") {
						return "Sim"
					} else {
						return "Nao"
					}
				}, type: "string"
			}
		],
		columnMenu: true,
		selectable: "row",
		dataSource: {
			transport: {
				read: function (options) {
					options.success(JSON.parse(localStorage.getItem("produtos")) || [])
				}
			}

		},
		sortable: true,
		pageable: {
			refresh: true,
			pageSizes: true,
			buttonCount: 5
		},
		change: function () {
			console.log("change");
			var selected = this.select();

			var toolbar = $("#toolBar").data("kendoToolBar");

			toolbar.enable("#btnEditar");

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
		min: 0
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
						$("#modal").fadeIn("fast")
					} else {
						const produtos = JSON.parse(localStorage.getItem("produtos")) || []



						produtos.push({
							nome: $("#inputNome").val(),
							categoria: $("#inputCategoria").val(),
							valor: parseFloat($("#inputPreco").val()),
							dataCadastro: $("#inputDataCadastro").val(),
							ativo: $("#inputAtivo").data("kendoSwitch").value()
						})

						localStorage.setItem("produtos", JSON.stringify(produtos))

						$("#grid").data("kendoGrid").dataSource.read();
						$("#winCadastro").data("kendoWindow").close()

					}

					$("#botaoValidacao").click(function () {
						$("#modal").fadeOut("fast")
					})
				}
			},
			{
				type: "button", text: "Excluir", icon: "trash"
			},
			{
				type: "button", text: "Fechar", icon: "cancel", click: function () {
					$("#winCadastro").data("kendoWindow").close()
				}
			}
		]
	})

	$("#preview").kendoTabStrip({
		dataTextField: "text",
		dataSource: [
			{ text: "Detalhes" }
		]
	})

	$("#previewNome").kendoTextBox();

	$("#previewCategoria").kendoDropDownList({
		optionLabel: "Selecione uma categoria...",
		dataSource: [
			{ categoria: "Movel" },
			{ categoria: "Eletrodomestico" },
			{ categoria: "Utilitario" }
		],
		dataTextField: "categoria",
		dataValueField: "categoria"
	})

	$("#previewPreco").kendoNumericTextBox({
		min: 0,
		format: "n0"
	});

	$("#previewDataCadastro").kendoDatePicker();

	$("#previewAtivo").kendoSwitch({
		checked: true
	})



});