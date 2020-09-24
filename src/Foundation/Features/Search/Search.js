export default class ContentSearch {
    init() {
        let inst = this;
        $('.jsChangePageContent').each(function (i, e) {
            $(e).click(function () {
                $('.loading-box').show();
                let page = $(this).attr('page');
                inst.changePageContent(page);
            });
        });
    }

    changePageContent(page) {
        let search = new ProductSearch();
        let inst = this;
        let form = $(document).find('.jsSearchContentForm');
        $('.jsSearchContentPage').val(page);
        $('.jsSelectedFacet').val($(this).data('facetgroup') + ':' + $(this).data('facetkey'));
        let url = search.getUrlWithFacets();
        inst.updatePageContent(url, form.serialize(), null);
    }

    updatePageContent(url, data, onSuccess) {
        let inst = this;
        axios.post(url || "", data)
            .then(function (result) {
                $('#contentResult').replaceWith($(result.data).find('#contentResult'));
                inst.init();
            })
            .catch(function (error) {
                notification.error(error);
            })
            .finally(function () {
                $('.loading-box').hide();
            });
    }
}