import iFilterState from "./iFilterState";

function filterStateToUrl(filterState: iFilterState) {
    let url = "https://free-to-play-games-database.p.rapidapi.com/api/"

    if (filterState.tags.indexOf(',') === -1) {
        url += "games"
    } else {
        url += "filter"
    }

    if (filterState.sort !== "5" || filterState.platform !== "3" || filterState.tags !== "") {
        url += '?'
        switch (filterState.sort) {
            case '1': {
                url += "sort-by=release-date"
                break
            }
            case '2': {
                url += "sort-by=popularity"
                break
            }
            case '3': {
                url += "sort-by=alphabetical"
                break
            }
            case '4': {
                url += "sort-by=relevance"
                break
            }
            default: {
                break
            }
        }
        if (filterState.sort !== "5") {
            url += '&'
        }
        switch (filterState.platform) {
            case '1': {
                url += "platform=browser"
                break
            }
            case '2': {
                url += "platform=pc"
                break
            }
            default: {
                break
            }
        }
        if (filterState.platform !== "3" && filterState.tags !== "") {
            url += '&'
        }
        if (filterState.tags !== "") {
            if (filterState.tags.indexOf(',') === -1) {
                url += "category=" + filterState.tags
            } else {
                url += "tags=" + filterState.tags.replace(',', '.')
            }
        }
    }

    return url
}

export default filterStateToUrl