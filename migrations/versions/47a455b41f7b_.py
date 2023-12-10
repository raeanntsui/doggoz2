"""empty message

Revision ID: 47a455b41f7b
Revises: 
Create Date: 2023-12-09 21:26:20.739052

"""
from alembic import op
import sqlalchemy as sa

# add 1
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
#

# revision identifiers, used by Alembic.
revision = '47a455b41f7b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")    

    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_owner_id', sa.Integer(), nullable=True),
    sa.Column('product_name', sa.String(), nullable=False),
    sa.Column('product_description', sa.String(), nullable=False),
    sa.Column('product_category', sa.String(), nullable=False),
    sa.Column('product_price', sa.Integer(), nullable=False),
    sa.Column('product_image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['product_owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")

    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review_description', sa.String(length=300), nullable=False),
    sa.Column('review_image', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('products')
    op.drop_table('users')
    # ### end Alembic commands ###