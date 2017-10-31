/* eslint-disable valid-jsdoc */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;


/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let subscription = [];

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function on(event, context, handler) {
            subscription.push(
                {
                    event,
                    context,
                    handler
                });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            event += '.';
            subscription = subscription.filter(events =>
                events[context] !== context ||
                events[event] !== event && !events[event].startsWith(event));

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let eventParts = event.split('.');
            while (eventParts.length) {
                subscription.forEach(item => {
                    if (item[eventParts] === eventParts && (!item.filter || item.filter())) {
                        item.handler.call(item.context);
                    }
                });
                eventParts.pop();
            }


            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
