//global variables
const championsName = []
const championsSplash = []
const championsProfile = []


loadChampionsInfo()

//load all champions cards
async function loadChampionsInfo() {
    const jsonResponse = await fetch('../api/champions.json')
    const jsonData = await jsonResponse.json()


    for (champion of jsonData) {
        championsName.push(champion.node.champion_name)
        championsSplash.push(champion.node.champion_splash)
        championsProfile.push(champion.node.champion.profile_image)
    }

    // for (let count = 0; count < championsName.length; count++) {
        for (let count = 0; count < 12; count++) {
            //card structure
            const championCard = document.createElement('div')
            const a = document.createElement('a')
            const championProfile = document.createElement('div')
            const championTag = document.createElement('div')
            const championName = document.createElement('div')

                //champ name
                championName.textContent = championsName[count]
                championName.classList.add('champion-name')
                championTag.id = championsName[count]
                championTag.classList.add('champion-tag', 'py-2', 'pl-4', 'bg-slate-800', 'text-white', 'font-bold', 'text-lg', 'uppercase', 'italic', 'tracking-wide')

                //champ profile
                const profileImg = document.createElement('img')
                    profileImg.src = championsProfile[count].url
                    profileImg.classList.add('w-full', 'h-full', 'object-cover', 'scale-110', 'transition-transform', 'duration-500')
                    championProfile.appendChild(profileImg)
                    championProfile.classList.add('champion-profile', 'rounded-tr-2xl', 'overflow-hidden', 'aspect-[5/6]')

                //champ ahref
                a.href = `champion.html?champion=${encodeURIComponent(championsName[count])}`

                //attaching
                championTag.appendChild(championName)
                a.appendChild(championProfile)
                a.appendChild(championTag)
                championCard.appendChild(a)
                championCard.classList.add('champion-card')

            

            //fullfill cards on wrapper container
            const championCardsDOM = document.querySelector('.champions-cards')
                championCardsDOM.appendChild(championCard)
        }

        championCardHover()
}



// [CHAMPION CARD] > hover effect
function championCardHover() {
    const championCardDOM = document.querySelectorAll('.champion-card')

    //mouse over champion card
    for (card of championCardDOM) {
        card.addEventListener('mouseover', function(event){

            const card = event.currentTarget
            const tag = card.querySelector('a .champion-tag')
            const name = card.querySelector('a .champion-tag .champion-name')
            const img = card.querySelector('a .champion-profile img')

                console.log('in')

                img.classList.remove('scale-110')
                img.classList.add('scale-105')
                tag.classList.remove('bg-slate-800')
                tag.classList.add('transition-colors', 'duration-500', 'ease-in-out', 'bg-cyan-800')        
                name.classList.add('transition', 'duration-500', 'ease-in-out', 'translate-x-3')   
        })
    }

    //mouse out champion card
    for (card of championCardDOM) {
        card.addEventListener('mouseout', function(event2) {
            const card = event2.currentTarget
            const tag = card.querySelector('a .champion-tag')
            const name = card.querySelector('a .champion-tag .champion-name')
            const img = card.querySelector('a .champion-profile img')

                console.log('out')

                img.classList.remove('scale-105')
                img.classList.add('scale-110')
                tag.classList.remove('bg-cyan-800')  
                tag.classList.add('bg-slate-800')      
                name.classList.remove('translate-x-3') 
        }) 
    }
}



// [RiotGames LOGO] > hover effect
document.querySelector('.riot-logo').addEventListener('mouseover', function(){
    document.querySelector('.riot-logo a img').src = 'riot-games-red.png'
    document.querySelector('.riot-logo a i').style.color = '#d53443'

    document.querySelector('.riot-logo').addEventListener('mouseout', function(){
        document.querySelector('.riot-logo a img').src = 'riot-games-white.png'
        document.querySelector('.riot-logo a i').style.color = 'grey'
    })
})