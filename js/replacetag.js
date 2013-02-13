/**
 * Copyright (c) 2013 narsic.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author    narsic <narsicnet@gmail.com>
 * @copyright 2013 narsic
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 */

function ReplaceTag(str, tag, all){
/**
    replace html tag in string
    don't use xregexp for small code

    @param str string html code
    @param tag string html tag name to replace
    @param all boolean flag to replace all tag or not, default true
    @return string html code without tag
**/

    this.str = str;
    this.tag = tag;
    if (all  === false) {
        this.replaceAll = false;
    } else {
        this.replaceAll = true;
    }

    this.getStartIndex = function(start) {
    /**
        get tag start index

        @param start integer get start index search
        @return integer index or -1
    **/

        var startTag = '<' + this.tag;
        start = this.str.indexOf(startTag, start? start:0);
        while (true) {
            if (start === -1) {
                break;
            }
            var nextCharTag = this.str.charAt(start + startTag.length);
            if (nextCharTag == ' ' || nextCharTag == '>') {
                return start;
            }
            start = this.str.indexOf(startTag, start+1);
        }
        return -1;
    };

    this.getEndIndex = function(start) {
    /**
        get tag end index

        @param start integer get start index search
        @return integer index or -1
    **/

        var endTag = '</' + this.tag;
        var end = this.str.indexOf(endTag, start);
        while (true) {
            if (end === -1) {
                break;
            }
            var nextCharTag = this.str.charAt(end + endTag.length);
            if (nextCharTag == ' ' || nextCharTag == '>') {
                return end;
            }
            end = this.str.indexOf(endTag, end + 1);
        }
        return -1;
    };

this.initialize = function() {
        var start = this.getStartIndex(); 
        while (true) {
            if (start === -1) {
                break;
            }
            var end   = this.getEndIndex(start);
            //get end of tag, don't use tag.length because some idiot designer
            // set unformatted tag
            end = this.str.indexOf('>', end);
            end++;
            var newStr  = this.str.substr(0, start);
            newStr += this.str.substr(end);
            this.str = newStr;
            if (!this.replaceAll) {
                break;
            }
            start = this.getStartIndex(); 
        }
        return this.str;
    };

    //FIXME
    return this.initialize();

}
