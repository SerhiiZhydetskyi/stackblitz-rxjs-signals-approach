export class RandomHelper {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    static getRandomInt(min: number, max: number, isNegative = false): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        return isNegative ? rnd * -1 : rnd;
    }

    static getRandomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter++;
        }
        return result;
    }
}