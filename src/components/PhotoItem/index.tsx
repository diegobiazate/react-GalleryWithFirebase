import * as C from './styles';

type Props = {
    name: string;
    url: string;
}

export function PhotoItem({url, name}: Props){
    return(
        <C.Container>
            <img src={url} alt={name} />
            {name}
        </C.Container>
    )
}