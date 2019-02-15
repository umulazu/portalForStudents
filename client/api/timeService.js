export const addTime = (username, date, start, finish) => {
    return fetch('/addTime', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, date, start, finish})
    })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => data.diff)
            } else {
                throw response.status
            }
        })
}