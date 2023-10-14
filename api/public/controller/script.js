function obtener() {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }
        };

        fetch('/representante_legal', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

app.get('/list-representantes-legales', (req, res) => {
    obtener()
        .then( (response) => {
            res.render('list-representantes-legales', { response });
        } )
        .catch( (error) => {
            alert('Error al listar.')
        } )
    //res.render('list-representantes-legales');
});

