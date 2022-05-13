const startBlock = document.querySelector('.beer');

function createBeerCard(dataList){
    let beerCard;

    for (let i = 0; i < dataList.length; i++) {
        beerCard = {
            tag: 'div',
            cls: 'beer__card',
            content: [
              {
                tag: 'h2',
                cls: 'beer__title',
                text: dataList[i].name,
              },
              {
                tag: 'h5',
                cls: 'beer__tagline',
                text: dataList[i].tagline,
              },
              {
                tag: 'div',
                cls: 'beer__wrapper',
                content: [
                  {
                    tag: 'img',
                    cls: 'beer__image',
                    attrs: {
                      src: dataList[i].image_url,
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
                        text: `${dataList[i].abv} % ABV / ${beerList[i].volume.value} ${beerList[i].volume.unit}`
                      },
                      {
                        tag: 'h3',
                        cls: 'beer__food-title',
                        text: 'Good with',
                      },
                      {
                        tag: 'ul',
                        cls: 'beer__food',
                        list: dataList[i].food_pairing,
                      },
                      {
                        tag: 'p',
                        cls: 'beer__tips-title',
                        text: 'Brewers tips',
                      },
                      {
                        tag: 'p',
                        cls: 'brewers-tips',
                        text: dataList[i].brewers_tips,
                      },
                    ],
                  },
                ],
              },
              {
                tag: 'p',
                cls: 'beer__description',
                text: dataList[i].description,
              },
            ],
          };
    
          startBlock.appendChild(templateEngine(beerCard));
    }
}

createBeerCard(beerList);









