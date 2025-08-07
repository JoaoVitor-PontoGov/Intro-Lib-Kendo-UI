$(function () {
	$("#toolBar").kendoToolBar({
		iconPosition: "before",
		items: [
			{ type: "spacer" },
			{
				type: "buttonGroup",
				buttons: [
					{
						text: "Incluir", icon: "plus", click: function () {
							if (!$("#winCadastro").data("kendoWindow")) {
								$("#winCadastro").kendoWindow({
									modal: true,
									width: "26%",
									height: "30%",
									visible: false
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
									height: "30%",
									visible: false
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
		]
	})

	$("#inputNome").kendoTextBox();

	$("#inputCategoria").kendoDropDownList({
		dataSource: [
			{ categoria: "Movel" },
			{ categoria: "Eletrodomestico" },
			{ categoria: "Utilitario" }
		],
		dataTextField: "categoria",
		dataValueField: "categoria"
	})

	$("#inputPreco").kendoNumericTextBox();

	$("#inputDataCadastro").kendoDatePicker();

	$("#inputAtivo").kendoSwitch({
		checked: true
	})
});