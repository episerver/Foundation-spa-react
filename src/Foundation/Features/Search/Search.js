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
        let url = this.getUrl(page);
        let form = $(document).find('.jsSearchContentForm');
        $('.jsSearchContentPage').val(page);
        $('.jsSelectedFacet').val($(this).data('facetgroup') + ':' + $(this).data('facetkey'));
        this.updatePageContent(url, form.serialize(), null);
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

    getUrlParams() {
        let match,
            search = /([^&=]+)=?([^&]*)/g, //regex to find key value pairs in querystring
            query = window.location.search.substring(1);

        let urlParams = {};
        while (match = search.exec(query)) {
            urlParams[match[1]] = match[2];
        }
        return urlParams;
    }

    getUrl(page) {
        var urlParams = this.getUrlParams();
        urlParams.page = page;
        let url = "?";
        for (let key in urlParams) {
            let value = urlParams[key];
            if (value) {
                url += key + '=' + value + '&';
            }
        }
        return url.slice(0, -1);
    }
}