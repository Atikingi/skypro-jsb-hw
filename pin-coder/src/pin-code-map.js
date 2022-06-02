const pinCodeMap = [{
    tag: 'form',
    cls: 'pin-code__content',
    attrs:{
        action: '#',
    },
    content: [{
        tag: 'h1',
        cls: 'pin-code__title',
        text: 'Придумайте и сохраните новый пин-код',
    },
    {
        tag: 'input',
        cls: 'pin-code__input-inner',
        attrs: {
            type: 'text',
            placeholder: '6 цифр',
            maxlength: '6',
            autocomplete: 'off',
        },
        attr: 'required',
     },
    {
        tag: 'div',
        cls: ['pin-code__accept', 'pin-code__accept__hidden'],
        content:[{
            // ???????????????????????????????????? придумать как добавить инпутов 
            // столько сколько длина локал стораджа
        }],
    },
    {
        tag: 'div',
        cls: 'pin-code__keyboard',
        content: [{
            // ?????????придумать как добавить 10 дивов с цифрами
        }],
    },
    {
        tag: 'button',
        cls: ['pin-code__save', 'pin-code__button'],
        text: 'Сохранить пин-код',
        attrs:{
            type: 'submit',
        },
    },
    {
        tag: 'button',
        cls: ['pin-code__clear', 'pin-code__clear__hidden', 'pin-code__button'],
        text: 'Очистить сохраненный пин-код',
        attrs:{
            type: 'submit',
        }, 
    },
]
}]