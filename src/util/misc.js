import fs from 'fs';
import { Text, useInput } from 'ink';
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
export function getFiles(dir, setFiles, setQueue, consoleHeight, top, bottom) {
    new Promise((resolve, reject) => {
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
    }).then((files) => {
        setFiles(files);
        let size = Math.min(files.length, consoleHeight);
        setQueue(files.slice(0, size));
        top.current = 0;
        bottom.current = size;
    });
}
export function manageInput(p, file, setFile, size, length, check) {
    useInput((input, key) => {
        switch (input) {
            case 'k':
                if (file > 0) {
                    setFile(file - 1);
                }
                if (p.current > 0) p.current--;
                check();
                break;
            case 'j':
                if (file < size - 1) {
                    setFile(file + 1);
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
                pointed={file == i}
                name={queue[i].name}
                type={queue[i].type}
                dmsn={dmsn}
            />,
        );
    }
    return tmp;
}
