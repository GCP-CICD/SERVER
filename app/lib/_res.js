module.exports = class _res {
  constructor(ctx) {
    this.code = ctx?.code || '200';
    this.data = ctx?.data || '';
    this.message = ctx?.message || 'OK';
  }
};
