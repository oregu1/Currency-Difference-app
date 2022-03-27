//ПОЛУЧАЕМ ДОСТУП К таблице
const table = document.querySelector('table');

window.addEventListener('DOMContentLoaded', async () => {
    await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(res => res.json())
    .then(response => {
        let data = Object.values(response.Valute);
        data.map(item => {
            let difference = Number.parseFloat((((item.Value - item.Previous) / item.Previous) * 100)).toFixed(2);
    
            table.innerHTML += `
             <tr>
                 <td class="char-code">${item.CharCode}
                    <span>${item.Name}</span>
                 </td>
                 <td>${Number.parseFloat(item.Value).toFixed(3)} ₽</td>
                 <td class="${colorRating(difference)}">${difference}%</td>
             </tr>`
        })
    })
    .catch(error => console.log(error))
})

//Функция окрашивающая данные. На понижение - красным, на повышение - зеленым
function colorRating(num) {
    if(num > 0) {
        return 'green'
    } else {
        return 'red'
    }
}

