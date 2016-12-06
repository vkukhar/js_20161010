(() => {
    'use strict';
    let Menu = window.Menu;
    let Form = window.Form;
    let Note = window.Note;

    let template = window.fest['app'];

    let menuData = {
        list: [
            {
                title: 'Все заметки',
                name: 'all'
            },
            {
                title: 'Текст',
                name: 'text'
            }
        ]
    };

    let notesData = [
        {
            type: 'text',
            text: '1234',
            color: 'yellow',
            tags: ['text', 'all']
        },
        {
            type: 'text',
            text: '2345',
            color: 'yellow',
            tags: ['text']
        }
    ];

    class App {

        constructor (node) {
            this.node = node;
            this.render();

            this.menu = new Menu(document.querySelector('.js-menu'), menuData);
            this.form = new Form(document.querySelector('.js-menu-form'));
            this.notes = [];

            this.form.node.addEventListener('add-new', event => {
                this.menu.add(event.detail);
            });

            this.renderNotes(notesData);

            this.setRoute(location.hash.replace('#', ''));
        }

        setRoute (route) {
            this.menu.toggleActive(route);
        }

        render () {
            this.node.innerHTML = template();
        }
        
        renderNotes (data) {
            document.querySelector('.js-notes').innerHTML = '';
            data.forEach( item => this.addNote(item) );
        }

        addNote (item) {
            let div = document.createElement('div');
            let note = new Note(div, item);

            this.notes.push(note);
            this.node.querySelector('.js-notes').appendChild(div);
        }
        
        notesFilter (route) {
            const filterData = notesData.filter((note) => {
                return note.tags.indexOf(route) !== -1;
            });
            
            this.renderNotes(filterData);
        }

    }

    document.addEventListener('DOMContentLoaded', () => {
        let app = new App(document.body);

        window.addEventListener('hashchange', () => {
            const route = location.hash.replace('#', '');
            app.notesFilter(route);
            app.setRoute(route);
        });

    });


})();