import { Box, render } from 'ink';
import p from 'path';
import React from 'react';
import CPane from './CPane.js';
import LPane from './LPane.js';
import RPane from './RPane.js';
import { getFiles } from './util/misc.js';

const CDX = () => {
    const height = process.stdout.rows;
    const width = process.stdout.columns;
    const [dir, setDir] = React.useState(p.resolve('.'));
    const [file, setFile] = React.useState({ x: 0 });
    const [files, setFiles] = React.useState([]);
    const [queue, setQueue] = React.useState([]);
    const top = React.useRef({ v: 0 });
    const bottom = React.useRef({ v: queue.length });
    const updateQueue = () => {
        setQueue(files.slice(top.current, bottom.current));
    };
    React.useLayoutEffect(() => {
        getFiles(dir).then((files) => {
            setFile({
                x: 0,
                name: files[0].name,
                type: files[0].type,
            });
            setFiles(files);
            bottom.current.v = Math.min(files.length, height);
            setQueue(files.slice(top.current.v, bottom.current.v));
        });
    }, []);
    return (
        <Box width={width} overFlow="hidden" flexDirection="row" gap={1}>
            <LPane dir={p.dirname(dir)} consoleHeight={height} />
            <CPane
                file={file}
                queue={queue}
                top={top}
                bottom={bottom}
                updateQueue={updateQueue}
                setFile={setFile}
                filesLen={files.length}
            />
            <RPane dir={dir} file={file} consoleHeight={height} />
        </Box>
    );
};

render(<CDX />);
