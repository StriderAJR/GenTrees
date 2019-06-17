import 'react-contexify/dist/ReactContexify.min.css'
import logo from './static/logo.svg'
import './style/App.css'

import React, {Component} from 'react';
import FamilyTree from './components/FamilyTree'

const familyTreeMenuId = 'family-context-menu';
const nodeHeight = 120;
const nodeWidth = 200;

const MenuItems = {
    CREATE_PERSON: 'CREATE_PERSON',
    CREATE_SPOUSE: 'CREATE_SPOUSE',
    CREATE_SIBLING: 'CREATE_SIBLING',
    CREATE_PARENT: 'CREATE_PARENT',
    CREATE_CHILD: 'CREATE_CHILD',
    EDIT: 'EDIT',
    DELETE: 'DELETE'
};

const RelationType = {
    SIBLING: 'SIBLING',
    SPOUSE: 'SPOUSE',
    PARENT: 'PARENT',
    ADOPTED_CHILD: 'ADOPTED_CHILD',
    CHILD: 'CHILD'
};

const RelationAntonym = (relation) => {
    if(relation === RelationType.SIBLING) return RelationType.SIBLING;
    if(relation === RelationType.SPOUSE) return RelationType.SPOUSE;
    if(relation === RelationType.PARENT) return RelationType.CHILD;
    if(relation === RelationType.CHILD) return RelationType.PARENT;
    if(relation === RelationType.ADOPTED_CHILD) return RelationType.PARENT;
};

const LineType = {
    SOLID: 'SPLID',
    DASHED: 'DASHED'
};

const LineAnchor = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};





// TODO Пункты меню
// TODO    Создать -> сын (выбор второго родителя, если было несколько браков)
// TODO    Создать -> дочь (выбор второго родителя, если было несколько браков)
// TODO    Создать -> отец (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> мать (недоступно, если уже есть 2 человека в родителях)
// TODO    Создать -> жена
// TODO    Создать -> муж
// TODO    Создать -> приемный сын (выбор второго родителя)
// TODO    Создать -> приемная дочь (выбор второго родителя)
// TODO    Создать -> приемный отец (выбор второго родителя)
// TODO    Создать -> приемная мать (выбор второго родителя)
// TODO Изменить
// TODO Удалить
// TODO Просмотр
// TODO Выбор двух узлов и создание связи
// TODO Не убирать создание нового человека


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '???'
        }
    }

    componentDidMount() {
        fetch('https://stridingsoft.ru/GenTrees')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({message: result.Message});
                },
                (error) => {
                    this.setState({message: error.Message});
            });
    }

    render() {

        let versionText = 'v' + process.env.REACT_APP_VERSION;

        return (
            <div className="App">
                <header className="App-header">
                    <img style={{float: 'left'}} src={logo} className="App-logo" alt="logo"/>
                    <div style={{float: 'left'}}>
                        <div className="App-title">Genealogy Trees</div>
                        <div className="App-hint">Right-click to see menu</div>
                    </div>
                    <div style={{float: 'right', textAlign: 'right'}} className='App-hint'>
                        <div>{versionText}</div>
                        <div>{this.state.message}</div>
                    </div>
                </header>
                <FamilyTree/>
            </div>
        );
    }
}

export default App;
