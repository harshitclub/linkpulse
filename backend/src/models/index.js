import { sequelize } from '../config/db.js';
import { Link } from './Link.js';
import { Click } from './Click.js';

// Define relationship: One Link has Many Clicks
Link.hasMany(Click, { foreignKey: 'linkId', as: 'clicks', onDelete: 'CASCADE' });
Click.belongsTo(Link, { foreignKey: 'linkId', as: 'link' });

export { sequelize, Link, Click };
