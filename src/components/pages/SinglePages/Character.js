import './character.scss';

const Character = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="character">
            <img src={thumbnail} alt={name} className="character__img"/>
            <div className="character__info">
                <h2 className="character__name">{name}</h2>
                <p className="character__descr">{description}</p>
            </div>
        </div>
    )
}

export default Character;