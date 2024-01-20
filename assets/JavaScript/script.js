$(function () {
    $("#file-manager").dxFileManager({
        name: "fileManager",
        fileSystemProvider: customProvider,
        currentPath: "Documentos",
        rootFolderName: "Root",
        permissions: {
            download: true
        },
        language: "pt-BR",
        onToolbarItemClick(e) {
            if (e.itemData === "delete") {
                var itemName = e.component.getSelectedItems()[0].name;
                setTimeout(function () {
                    $("div.dx-filemanager-dialog-delete-item > div").attr("title", itemName);
                }, 0);
            }
        },
        contextMenu: {
            items: ["create", {
                name: "download"
            }]
        },
        customizeDetailColumns: (columns) => {
            columns.push({
                caption: "Criado",
                dataField: "dataItem.creator"
            });
            return columns;
        }
    });
});

var fileSystem = [{
    name: "Sistemas de Arquivos",
    isDirectory: true,
    items: [{
        name: "Antivirus",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "PANDAFREEAV",
            isDirectory: false,
            creator: "Aeon",
            size: 1024,
            download: "https://github.com/iTPr0/FileExplorer/files/13810769/PANDAFREEAV.zip"
        },]
    }, {
        name: "Drivers & Ativação",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "Script",
            isDirectory: false,
            creator: "Aeon",
            size: 1024,
            download: "https://github.com/iTPr0/FileExplorer/files/13831946/script.zip"
        }]
    }, {
        name: "OfficeSetup",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "OfficeSetup",
            isDirectory: false,
            creator: "Aeon",
            size: 1024,
            download: "https://github.com/iTPr0/FileExplorer/files/13810797/OfficeSetup.zip"
        }]
    }, {
        name: "Visual-C-Runtimes",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "VcRedist.ALL",
            isDirectory: false,
            creator: "Aeon",
            size: 1024,
            download: "https://github.com/iTPr0/FileExplorer/files/13998994/VcRedist.ALL.zip"
        }]
    }, {
        name: "Sistemas Operacionais",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "Win10",
            isDirectory: true,
            creator: "Aeon",
            items: [{
                name: "Win.32&64bits.BrazilianPortuguese",
                isDirectory: false,
                creator: "Aeon",
                size: 20480,
                download: "https://github.com/iTPr0/FileExplorer/files/13840867/Win10.zip"
            }]
        }, {
            name: "Win11",
            isDirectory: true,
            creator: "Aeon",
            items: [{
                name: "Win.64Bits.BrazilianPortuguese",
                isDirectory: false,
                creator: "Aeon",
                size: 20480,
                download: "https://github.com/iTPr0/FileExplorer/files/13840875/Win11.zip"
            }, {
                name: "PorqueNaoWin11",
                isDirectory: true,
                creator: "Aeon",
                items: [{
                    name: "WhyNowWin11",
                    isDirectory: false,
                    creator: "Aeon",
                    size: 20480,
                    download: "https://github.com/iTPr0/FileExplorer/files/13840909/Por.que.Nao.Win11.zip"
                }]
            },]
        }, {
            name: "WinAIO",
            isDirectory: true,
            creator: "Aeon",
            items: [{
                name: "Win.AIO.32&64bits.BrazilianPortuguese",
                isDirectory: false,
                creator: "Aeon",
                size: 20480,
                download: "https://github.com/iTPr0/FileExplorer/files/13840886/WinAIO.zip"
            }]
        }]
    },]
}, {
    name: "Desktop",
    isDirectory: true,
    creator: "Aeon",
    items: [{
        name: "Downloads",
        isDirectory: true,
        creator: "Aeon",
        items: [{
            name: "DriverEasy",
            isDirectory: false,
            creator: "Aeon",
            size: 20480,
            download: "https://github.com/iTPr0/FileExplorer/files/13810800/DriverEasy.zip"
        },]
    }]
}];

var objectProvider = new DevExpress.fileManagement.ObjectFileSystemProvider({
    data: fileSystem
});

var customProvider = new DevExpress.fileManagement.CustomFileSystemProvider({
    getItems: function (pathInfo) {
        return objectProvider.getItems(pathInfo);
    },

    downloadItems: function (items) {
        if (items.length === 1) {
            downloadSingleFile(items[0]);
        } else {
            downloadMultipleFiles(items);
        }
    }
});

function downloadSingleFile(file) {
    var downloadLink = file.dataItem.dataItem.download || null;

    if (downloadLink) {
        window.open(downloadLink, '_blank');
    } else {
        console.error("Link de download não disponível para o arquivo selecionado.");
    }
}

function downloadMultipleFiles(files) {
    var zip = new JSZip();

    files.forEach(function (file) {
        var content = file.dataItem.dataItem.download || "";
        zip.file(file.name, content, { base64: true });
    });

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "Download.zip");
        });
}