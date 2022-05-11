const startBlock = document.querySelector('.beer');

function createBeerCard(){
    let beerCard;

    for (let i = 0; i < beerList.length; i++) {
        beerCard = {
            tag: 'div',
            cls: 'beer__card',
            content: [
              {
                tag: 'h2',
                cls: 'beer__title',
                text: beerList[i].name,
              },
              {
                tag: 'h5',
                cls: 'beer__tagline',
                text: beerList[i].tagline,
              },
              {
                tag: 'div',
                cls: 'beer__wrapper',
                content: [
                  {
                    tag: 'img',
                    cls: 'beer__image',
                    attrs: {
                      src: beerList[i].image_url,
                      width: '100',
                      height: '330',
                    },
                  },
                  {
                    tag: 'div',
                    cls: 'beer__content',
                    content: [
                      {
                        tag: 'p',
                        cls: 'beer__strength',
                        text: `${beerList[i].abv} % ABV / ${beerList[i].volume.value} ${beerList[i].volume.unit}`
                      },
                      {
                        tag: 'h3',
                        cls: 'beer__food-title',
                        text: 'Good with',
                      },
                      {
                        tag: 'ul',
                        cls: 'beer__food',
                        list: beerList[i].food_pairing,
                      },
                      {
                        tag: 'p',
                        cls: 'beer__tips-title',
                        text: 'Brewers tips',
                      },
                      {
                        tag: 'p',
                        cls: 'brewers-tips',
                        text: beerList[i].brewers_tips,
                      },
                    ],
                  },
                ],
              },
              {
                tag: 'p',
                cls: 'beer__description',
                text: beerList[i].description,
              },
            ],
          };
    
          startBlock.appendChild(templateEngine(beerCard));
    }
}

createBeerCard();









