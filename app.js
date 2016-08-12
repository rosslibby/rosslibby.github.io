$(document).ready(function () {
    var url = $('#url').val();
    var sku = $('#sku').val();
    var superDeal = $('#superDeal').val();
    var store = $('#store').val();

    function buildLink (url, sku, superDeal, store) {
        if (superDeal !== '') {
            superDeal = '?superDeal=' + superDeal;
        }

        if (store !== '' && superDeal !== '') {
            store = '&store=' + store;
        }

        $('#link').text(url + sku + superDeal + store);
    }

    $('#sku').on('keyup', function (e) {
        sku = $(this).val();
        buildLink(url, sku, superDeal, store);
    });

    $('#url').on('keyup', function (e) {
        url = $(this).val();
        buildLink(url, sku, superDeal, store);
    });

    $('#superDeal').on('keyup', function (e) {
        superDeal = $(this).val();
        buildLink(url, sku, superDeal, store);
    });

    $('#store').on('keyup', function (e) {
        store = $(this).val();
        buildLink(url, sku, superDeal, store);
    });
});