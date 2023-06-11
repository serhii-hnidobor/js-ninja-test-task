const heroCreateSchema = {
  type: 'object',
  properties: {
    catch_phrase: { type: 'string' },
    created_at: { type: 'string' },
    id: { type: 'string' },
    Images: { type: ['array', 'null'], items: { type: 'string' } },
    nickname: { type: 'string' },
    origin_description: { type: 'string' },
    real_name: { type: 'string' },
    superpowers: { type: ['array', 'null'], items: { type: 'string' } },
    updated_at: { type: 'string' },
  },
  required: ['catch_phrase', 'nickname', 'origin_description', 'real_name'],
  additionalProperties: false,
};

const heroUpdateSchema = {
  type: 'object',
  properties: {
    catch_phrase: { type: 'string' },
    created_at: { type: 'string' },
    id: { type: 'string' },
    Images: { type: ['array', 'null'], items: { type: 'string' } },
    nickname: { type: 'string' },
    origin_description: { type: 'string' },
    real_name: { type: 'string' },
    superpowers: { type: ['array', 'null'], items: { type: 'string' } },
    updated_at: { type: 'string' },
  },
  additionalProperties: false,
};

export { heroCreateSchema, heroUpdateSchema };
