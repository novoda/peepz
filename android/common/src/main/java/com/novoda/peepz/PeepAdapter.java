package com.novoda.peepz;

import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;

import java.util.List;

class PeepAdapter extends RecyclerView.Adapter<PeepViewHolder> {

    private List<Peep> peepz;

    public PeepAdapter() {
        super.setHasStableIds(true);
    }

    public void update(List<Peep> peepz) {
        this.peepz = peepz;
        notifyDataSetChanged();
    }

    @Override
    public PeepViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return PeepViewHolder.inflateView(parent);
    }

    @Override
    public void onBindViewHolder(PeepViewHolder holder, int position) {
        Peep peep = peepz.get(position);
        holder.bind(peep);
    }

    @Override
    public int getItemCount() {
        return peepz.size();
    }

    @Override
    public long getItemId(int position) {
        return peepz.get(position).id().hashCode();
    }

}
