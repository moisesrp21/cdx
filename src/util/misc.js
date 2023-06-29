import fs from 'fs';
import { Text, useInput, useStdout } from 'ink';
import path from 'path';
import File from '../File.js';

export function findFiles(dir, setFiles) {
    let tmp = [];
    try {
        if (fs.statSync(dir).isFile()) {
            fs.readdir(path.dirname(dir), (err, names) => {
                names.forEach((f) => {
                    tmp.push(f);
                });
                setFiles(tmp);
            });
        } else {
            fs.readdir(dir, (err, names) => {
                names.forEach((f) => {
                    tmp.push(f);
                });
                setFiles(tmp);
            });
        }
    } catch (e) {
        console.error('path does not exist or is inaccessible');
        console.log(e);
        process.exit();
    }
    return tmp.length;
}
export function getFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            const filePromises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    fs.stat(`${dir}/${file}`, (error, stats) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        const fileType = stats.isFile()
                            ? 'file'
                            : stats.isDirectory()
                            ? 'directory'
                            : 'other';
                        resolve({ name: file, type: fileType });
                    });
                });
            });
            Promise.all(filePromises)
                .then((fileData) => resolve(fileData))
                .catch((error) => reject(error));
        });
    });
}
export function manageInput(p, file, queue, setFile, length, check) {
    useInput((input, key) => {
        switch (input) {
            case 'k':
                if (file.x > 0) {
                    setFile({
                        x: file.x - 1,
                        name: queue[file.x - 1]?.name,
                        type: queue[file.x - 1]?.type,
                    });
                }
                if (p.current > 0) p.current--;
                check();
                break;
            case 'j':
                if (file.x < queue.length - 1) {
                    setFile({
                        x: file.x + 1,
                        name: queue[file.x + 1]?.name,
                        type: queue[file.x + 1]?.type,
                    });
                }
                if (p.current < length - 1) p.current++;
                check();
                break;
            case 'q':
                process.exit();
        }
    });
}

export function elements(files, consoleHeight, dmsn) {
    if (files != undefined && files.length != 0) {
        let tmp = [];
        let w = 0;
        let size = Math.min(consoleHeight, files.length);
        for (let i = 0; i < size; i++) {
            w = files[i].length;
            tmp.push(
                <Text key={i} backgroundColor={i == 0 ? '#005cc5' : ''}>
                    {files[i] + ' '.repeat(dmsn.width - w)}
                </Text>,
            );
        }
        return tmp;
    }
    return <Text>no available</Text>;
}

export function display(queue, file, dmsn) {
    let tmp = [];
    for (let i = 0; i < queue.length; i++) {
        tmp.push(
            <File
                key={i}
                pointed={file.x == i}
                name={queue[i].name}
                type={queue[i].type}
                dmsn={dmsn}
            />,
        );
    }
    return tmp;
}
