/* eslint-disable valid-jsdoc,linebreak-style */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

function sep(event) {
    let eventCount = (event.split('.').length - 1);
    let res = [event];
    for (let i = 0; i < eventCount; i++) {
        event = event.substring(0, event.lastIndexOf('.'));
        res.push(event);
    }

    return res;
}

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {

    return {
        subscription: [],

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            this.subscription.push(
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
            this.subscription.forEach((subscription, i) => {
                let index = subscription.event.indexOf(event);
                let eventSlicer = subscription.event[index + event.length];
                if (index === 0 &&
                    (eventSlicer === '.' || eventSlicer === undefined) &&
                    context === subscription.context) {
                    delete this.subscription[i];
                }
            }, this);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */

        emit: function (event) {
            sep(event).forEach(newEvent => {
                this.subscription.forEach(subscriptions => {
                    if (subscriptions.event === newEvent) {
                        subscriptions.handler.call(subscriptions.context);
                    }
                });
            }, this);

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
