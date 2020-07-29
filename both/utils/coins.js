import { Meteor } from 'meteor/meteor';
import numbro from 'numbro';

autoformat = (value) => {
    let formatter = '0,0.0000';
    value = Math.round (value * 1000) / 1000;
    if (Math.round (value) === value)
        formatter = '0,0'
    else if (Math.round (value * 10) === value * 10)
        formatter = '0,0.0'
    else if (Math.round (value * 100) === value * 100)
        formatter = '0,0.00'
    else if (Math.round (value * 1000) === value * 1000)
        formatter = '0,0.000'
    return numbro (value).format (formatter)
}

const coinList = Meteor.settings.public.coins;
for (let i in coinList) {
    const coin = coinList[i];
    if (!coin.displayNamePlural) {
        coin.displayNamePlural = coin.displayName + 's';
    }
}

const digitalMoney = function (n, nom) {
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    const head = n < 0 ? '欠' : '';
    n = Math.abs (n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor (n * 10 * Math.pow (10, i)) % 10] + fraction[i]).replace (/零./, '');
    }
    s = s || '整';
    n = Math.floor (n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor (n / 10);
        }
        s = p.replace (/(零.)*零$/, '').replace (/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace (/(零.)*零元/, '元')
        .replace (/(零.)+/g, '零')
        .replace (/^整$/, '零整');
}
const digitalCoin = function (n, nom) {
    const symbol = new String (nom).toUpperCase ();
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        [symbol, '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    const head = n < 0 ? '负' : '';
    n = Math.abs (n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor (n * 10 * Math.pow (10, i)) % 10] + fraction[i]).replace (/零./, '');
    }
    s = s || '整';
    n = Math.floor (n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor (n / 10);
        }
        s = p.replace (/(零.)*零$/, '').replace (/^$/, '零') + unit[0][i] + s;
    }
    return head +
        s.replace (/(零.)*零元/, '')
        .replace (/(零.)+/g, '零')
        .replace (/^整$/, '零整');
}

export default class Coin {
    static StakingCoin = coinList.find (coin => coin.denom === Meteor.settings.public.bondDenom);
    static MinStake = 1 / Number (Coin.StakingCoin.fraction);

    constructor (amount, denom = Meteor.settings.public.bondDenom) {
        const lowerDenom = denom.toLowerCase ();
        this._coin = coinList.find (coin =>
            coin.denom.toLowerCase () === lowerDenom || coin.displayName.toLowerCase () === lowerDenom
        );

        if (this._coin) {
            if (lowerDenom === this._coin.denom.toLowerCase ()) {
                this._amount = Number (amount);
            } else if (lowerDenom === this._coin.displayName.toLowerCase ()) {
                this._amount = Number (amount) * this._coin.fraction;
            }
        }
        else {
            this._coin = "";
            this._amount = Number (amount);
        }
    }

    get amount () {
        return this._amount;
    }

    get stakingAmount () {
        return (this._coin) ? this._amount / this._coin.fraction : this._amount;
    }

    toString (precision) {
        // default to display in mint denom if it has more than 4 decimal places
        let minStake = Coin.StakingCoin.fraction / (precision ? Math.pow (10, precision) : 10000)
        if (this.amount < minStake) {
            return `${numbro (this.amount).format ('0,0.0000')} ${this._coin.denom}`;
        } else {
            return `${precision ? numbro (this.stakingAmount).format ('0,0.' + '0'.repeat (precision)) : autoformat (this.stakingAmount)} ${this._coin.displayName}`
        }
    }

    mintString (formatter) {
        let amount = this.amount
        if (formatter) {
            amount = numbro (amount).format (formatter)
        }

        let denom = (this._coin == "") ? Coin.StakingCoin.displayName : this._coin.denom;
        return `${amount} ${denom}`;
    }

    stakeString (formatter) {
        let amount = this.stakingAmount
        if (formatter) {
            amount = numbro (amount).format (formatter)
        }
        return `${amount} ${Coin.StakingCoin.displayName}`;
    }

    toHanString () {
        // default to display in mint denom if it has more than 4 decimal places
        let minStake = Coin.StakingCoin.fraction / 1000
        if (this.amount < minStake) {
            return `${numbro (this.amount).format ('0,0.0000')} ${this._coin.denom}`;
        } else {
            return `${digitalCoin (this.stakingAmount, this._coin.displayName)}`
        }
    }
}
