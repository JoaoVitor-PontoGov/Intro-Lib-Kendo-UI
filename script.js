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
									height: "40%",
									visible: false,
									title: "Cadastro"
								})
							}
							$("#inputID").val("");
							$("#inputNome").val("");
							$("#inputCategoria").data("kendoDropDownList").value("");
							$("#inputPreco").data("kendoNumericTextBox").value(0);
							$("#inputDataCadastro").val("");
							$("#inputAtivo").val("");

							$("#botoesCadastro").data("kendoToolBar").enable("#btnExcluir", false)

							$("#winCadastro").data("kendoWindow").center().open()


						}
					},
					{
						text: "Editar", id: "btnCadEditar", icon: "pencil", enable: false, click: function () {
							if (!$("#winCadastro").data("kendoWindow")) {
								$("#winCadastro").kendoWindow({
									modal: true,
									width: "26%",
									height: "40%",
									visible: false,
									title: "Edicao"
								})
							}
							var grid = $("#grid").data("kendoGrid")
							var campoSelecionado = grid.dataItem(grid.select())

							$("#inputID").val(campoSelecionado.id)
							$("#inputNome").val(campoSelecionado.nome)
							$("#inputCategoria").data("kendoDropDownList").value(campoSelecionado.categoria)
							$("#inputPreco").data("kendoNumericTextBox").value(campoSelecionado.valor)
							$("#inputDataCadastro").val(campoSelecionado.dataCadastro)
							$("#inputAtivo").data("kendoSwitch").value(campoSelecionado.ativo)


							$("#botoesCadastro").data("kendoToolBar").enable("#btnExcluir")


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
			{ field: "id", title: "ID", width: "10%" },
			{ field: "nome", title: "Nome", type: "string" },
			{ field: "categoria", title: "Categoria", type: "string" },
			{ field: "valor", title: "Valor", type: "number", format: "{0:c2}", width: "10%" },
			{ field: "dataCadastro", title: "Data de Cadastro", type: "date", format: "{0:d}", width: "10%" },
			{
				field: "ativo", title: "Ativo:", width: "10%", template: function (produto) {

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
			var selected = this.select();

			var toolbar = $("#toolBar").data("kendoToolBar");
			var cadEdicao = $("#botoesCadastro").data("kendoToolBar")

			toolbar.enable("#btnCadEditar");

			var grid = $("#grid").data("kendoGrid")
			var campoSelecionado = grid.dataItem(grid.select())

			if (campoSelecionado) {

				$("#previewID").val(campoSelecionado.id)
				$("#previewNome").val(campoSelecionado.nome)
				$("#previewCategoria").data("kendoDropDownList").value(campoSelecionado.categoria)
				$("#previewValor").data("kendoNumericTextBox").value(campoSelecionado.valor)
				$("#previewDataCadastro").val(campoSelecionado.dataCadastro)
				$("#previewAtivo").data("kendoSwitch").value(campoSelecionado.ativo)

			}

		}

	})

	$("#inputID").kendoTextBox({
		readonly: true
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

						if ($("#inputID").val() == "") {
							var ultimoID = parseInt(localStorage.getItem("ultimoID") || 0)
							const produtos = JSON.parse(localStorage.getItem("produtos")) || []
							ultimoID++;

							produtos.push({
								id: ultimoID,
								nome: $("#inputNome").val(),
								categoria: $("#inputCategoria").val(),
								valor: parseFloat($("#inputPreco").val()),
								dataCadastro: $("#inputDataCadastro").val(),
								ativo: $("#inputAtivo").data("kendoSwitch").value()
							})

							console.log("cadastrando", produtos)
							localStorage.setItem("produtos", JSON.stringify(produtos))
							localStorage.setItem("ultimoID", ultimoID)

							$("#grid").data("kendoGrid").dataSource.read();
							$("#winCadastro").data("kendoWindow").close()

						} else {
							const produtos = JSON.parse(localStorage.getItem("produtos")) || []
							var grid = $("#grid").data("kendoGrid")
							var campoSelecionado = grid.dataItem(grid.select())

							const index = produtos.findIndex((a) => a.id == campoSelecionado.id)

							produtos[index] = {
								id: produtos[index].id,
								nome: $("#inputNome").val(),
								categoria: $("#inputCategoria").val(),
								valor: parseFloat($("#inputPreco").val()),
								dataCadastro: $("#inputDataCadastro").val(),
								ativo: $("#inputAtivo").data("kendoSwitch").value()
							}

							console.log("editando", produtos)
							localStorage.setItem("produtos", JSON.stringify(produtos))
							$("#grid").data("kendoGrid").dataSource.read();
							$("#winCadastro").data("kendoWindow").close()
						}
					}

					$("#botaoValidacao").click(function () {
						$("#modal").fadeOut("fast")
					})
				}
			},
			{
				type: "button", id: "btnExcluir", text: "Excluir", icon: "trash", enable: false, click: function () {
					const produtos = JSON.parse(localStorage.getItem("produtos")) || []
					var grid = $("#grid").data("kendoGrid")
					var campoSelecionado = grid.dataItem(grid.select())

					const novosDados = produtos.filter(a => (a.id !== campoSelecionado.id))

					localStorage.setItem("produtos", JSON.stringify(novosDados))
					$("#grid").data("kendoGrid").dataSource.read();
					$("#winCadastro").data("kendoWindow").close()
				}
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

	$("#previewID").kendoTextBox({
		readonly: true
	})

	$("#previewNome").kendoTextBox({
		readonly: true
	})

	$("#previewCategoria").kendoDropDownList({
		optionLabel: "Selecione uma categoria...",
		dataSource: [
			{ categoria: "Movel" },
			{ categoria: "Eletrodomestico" },
			{ categoria: "Utilitario" }
		],
		dataTextField: "categoria",
		dataValueField: "categoria",
		enable: false
	})

	$("#previewValor").kendoNumericTextBox({
		min: 0,
		format: "c2"
	});

	$("#previewValor").data("kendoNumericTextBox").readonly(true)

	$("#previewDataCadastro").kendoDatePicker();

	$("#previewDataCadastro").data("kendoDatePicker").enable(false);


	$("#previewAtivo").kendoSwitch({
		checked: true
	});

	$("#previewAtivo").data("kendoSwitch").enable(false);


});