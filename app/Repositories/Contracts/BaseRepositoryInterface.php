<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Model;

interface BaseRepositoryInterface
{
    public function find(int $id);

    public function create(array $data);

    public function update(Model $model, array $data): bool;

    public function delete(Model $model): bool;
}