import { Text } from 'ink';
// type:   file,   directory,  other
export default ({ i, pointed, name, type, dmsn }) => {
    const icon = type == 'directory' ? '' : type == 'file' ? '' : '';
    return (
        <Text
            key={i}
            backgroundColor={pointed ? '#005cc5' : ''}
            color={pointed ? 'black' : 'white'}
        >
            {' ' +
                icon +
                ' ' +
                name +
                ' '.repeat(dmsn.width - name?.length - 3)}
        </Text>
    );
};
