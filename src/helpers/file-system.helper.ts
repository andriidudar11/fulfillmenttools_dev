import fs from 'fs';

export class FileSystemHelper {
    public static checkFile(path: string): boolean {
        return fs.existsSync(path);
    }

    public static updateFile(path: string, data: object): boolean {
        try {
            fs.writeFileSync(path, JSON.stringify(data));
            return true;
        } catch {
            throw new Error('Error occurred while writing to the file');
        }
    }

    public static readFile(path: string): object {
        let result = null;
        try {
            const data = fs.readFileSync(path, { encoding: 'utf8' });

            result = JSON.parse(data);

            return result;
        } catch {
            throw new Error('Error occurred while reading a file');
        }
    }
}
