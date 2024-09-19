export const getNextMove = () => {

    fetch('Chess/getNextMove', {
        method: 'GET',
        //headers: {
        //    'Content-Type': 'application/json'  // Tell the server that you're sending JSON
        // },
        // body: JSON.stringify(state)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            //return response.json();  // Parse the incoming JSON response
        })
        .then(data => {
            console.log('Received response:', data);  // Log the received JSON object
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


/*export const getNextMove = (state:any, difficulty:number) => {
    state.difficulty = difficulty;

    fetch('Chess/getNextMove', {
        method: 'GET',                 
        //headers: {
        //    'Content-Type': 'application/json'  // Tell the server that you're sending JSON
       // },
       // body: JSON.stringify(state)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            //return response.json();  // Parse the incoming JSON response
        })
        .then(data => {
            console.log('Received response:', data);  // Log the received JSON object
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
*/


