import { Box, render, useStdout } from 'ink';
import p from 'path';
import React from 'react';
import CPane from './CPane.js';
import LPane from './LPane.js';
import RPane from './RPane.js';

const CDX = () => {
    const { stdout } = useStdout();
    const [dir, setPath] = React.useState(p.resolve('.'));
    const [pointer, setPoint] = React.useState('');
    return (
        <Box
            width={stdout.columns}
            overFlow="hidden"
            flexDirection="row"
            gap={1}
        >
            <LPane dir={p.dirname(dir)} consoleHeight={stdout.rows} />
            <CPane dir={dir} point={pointer} consoleHeight={stdout.rows} />
            <RPane pointer={pointer} consoleHeight={stdout.rows} />
        </Box>
    );
};

render(<CDX />);
