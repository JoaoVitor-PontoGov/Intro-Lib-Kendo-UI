$(function () {
	$("#toolBar").kendoToolBar({
		iconPosition: "before",
		items: [
			{
				type: "button", text: "Incluir", click: function () {
					if (!$("#winInserirEditar").data("kendoWindow")) {
						$("#winInserirEditar").kendoWindow({
							modal: true,
							width: "50%",
							height: "25%",
							visible: false,
						})
					}

					$("#winInserirEditar").data("kendoWindow").center().open()
				}
			},
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
});